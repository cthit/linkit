package middlewares

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/coreos/go-oidc"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

var (
	clientID     = getEnvFallback("OIDC_CLIENT_ID", os.Getenv("GAMMA_CLIENT_ID"))
	clientSecret = getEnvFallback("OIDC_CLIENT_SECRET", os.Getenv("GAMMA_CLIENT_SECRET"))
	redirectURI  = getEnvFallback("OIDC_REDIRECT", os.Getenv("GAMMA_REDIRECT"))
	oidcIssuer   = getEnvFallback("OIDC_ISSUER", os.Getenv("GAMMA_AUTH"))
	isDev        = os.Getenv("DEV")
)

type codeReq struct {
	Code  string `json:"code" binding:"required"`
	State string `json:"state"`
}

func getEnvFallback(key, fallback string) string {
	v := os.Getenv(key)
	if v != "" {
		return v
	}
	return fallback
}

func contains(slice []string, item string) bool {
	set := make(map[string]struct{}, len(slice))
	for _, s := range slice {
		set[s] = struct{}{}
	}

	_, ok := set[item]
	return ok
}

func genericError(err error, c *gin.Context) {
	fmt.Println(err.Error())
	c.String(500, "Internal server error")
	c.Abort()
}

// GammaAuth is a gin middleware which handles authentication via OIDC.
func GammaAuth() gin.HandlerFunc {
	// Try OIDC discovery if issuer is set
	var provider *oidc.Provider
	var oauth2Config *oauth2.Config
	var verifier *oidc.IDTokenVerifier

	if oidcIssuer != "" {
		ctx := context.Background()
		p, err := oidc.NewProvider(ctx, oidcIssuer)
		if err != nil {
			fmt.Println("OIDC discovery failed:", err)
		} else {
			provider = p
			oauth2Config = &oauth2.Config{
				ClientID:     clientID,
				ClientSecret: clientSecret,
				Endpoint:     provider.Endpoint(),
				RedirectURL:  redirectURI,
				Scopes:       []string{"openid", "profile"},
			}
			verifier = provider.Verifier(&oidc.Config{ClientID: clientID})
		}
	}

	discoveryFailed := oidcIssuer != "" && provider == nil

	// Build a fallback auth URI using old GAMMA_AUTH if oidc discovery isn't available
	gammaURI := os.Getenv("GAMMA_AUTH")

	return func(c *gin.Context) {
		session := sessions.Default(c)

		// Already authenticated
		if session.Get("token") != nil {
			c.Next()
			return
		}

		// DEV shortcut
		if isDev == "true" {
			session.Set("token", "token")
			session.Set("cid", "admin")
			session.Set("isAdmin", true)
			session.Save()
			c.Next()
			return
		}

		if discoveryFailed {
			c.String(500, "auth provider misconfigured")
			c.Abort()
			return
		}

		// If not requesting /api/auth, return 401 with auth URL
		if c.Request.URL.Path != "/api/auth" {
			if oauth2Config != nil {
				// generate state+nonce and store in session
				state := fmt.Sprintf("%d", time.Now().UnixNano())
				nonce := fmt.Sprintf("%d", time.Now().UnixNano()+1)
				session.Set("oidc_state", state)
				session.Set("oidc_nonce", nonce)
				session.Save()

				authURL := oauth2Config.AuthCodeURL(state, oauth2.SetAuthURLParam("nonce", nonce))
				c.String(401, authURL)
				c.Abort()
				return
			}

			if gammaURI != "" {
				c.String(401, gammaURI)
				c.Abort()
				return
			}

			c.String(401, "no auth provider configured")
			c.Abort()
			return
		}

		// Handle POST /api/auth
		if c.Request.Method == "POST" {
			var req codeReq
			if err := c.BindJSON(&req); err != nil {
				c.String(400, "invalid request")
				c.Abort()
				return
			}

			// Prefer OIDC flow if available
			if oauth2Config != nil {
				ctx := context.Background()

				// optionally verify state if provided; only enforce nonce when state is verified
				stateVerified := false
				if req.State != "" {
					if sessState := session.Get("oidc_state"); sessState != nil {
						if sessState.(string) != req.State {
							c.String(400, "invalid state")
							c.Abort()
							return
						}
						stateVerified = true
					}
				}

				token, err := oauth2Config.Exchange(ctx, req.Code)
				if err != nil {
					genericError(err, c)
					return
				}

				// Try to verify and extract ID token claims
				rawIDToken, _ := token.Extra("id_token").(string)
				var cid string
				if rawIDToken != "" && verifier != nil {
					idToken, err := verifier.Verify(ctx, rawIDToken)
					if err != nil {
						fmt.Println("id token verify failed:", err)
					} else {
						// nonce check: only enforce if we verified state in this request
						// If the ID token does not contain a nonce claim we do not fail
						// because some providers may omit it. Only reject when both
						// the ID token has a nonce and it doesn't match the session.
						if stateVerified {
							if sessNonce := session.Get("oidc_nonce"); sessNonce != nil {
								if idToken.Nonce != "" && idToken.Nonce != sessNonce.(string) {
									c.String(400, "invalid nonce")
									c.Abort()
									return
								}
							}
						}

						var claims struct {
							PreferredUsername string `json:"preferred_username"`
							Name              string `json:"name"`
							Nickname          string `json:"nickname"`
							Picture           string `json:"picture"`
							Cid               string `json:"cid"`
						}
						if err := idToken.Claims(&claims); err == nil {
							if claims.Cid != "" {
								session.Set("cid", claims.Cid)
								cid = claims.Cid
							}
							if claims.Nickname != "" {
								session.Set("nick", claims.Nickname)
							}
							if claims.Picture != "" {
								session.Set("avatarUrl", claims.Picture)
							}
						}
					}
				}

				// Determine admin from ADMINS env var
				admins := os.Getenv("ADMINS")
				adminsSlice := []string{}
				if admins != "" {
					adminsSlice = strings.Split(admins, ",")
				}
				isAdmin := contains(adminsSlice, cid)

				// Clear one-time state/nonce and save session
				session.Delete("oidc_state")
				session.Delete("oidc_nonce")

				// Save session
				session.Set("token", token.AccessToken)
				session.Set("cid", cid)
				session.Set("isAdmin", isAdmin)
				// store id_token as well if present
				if rawIDToken != "" {
					session.Set("id_token", rawIDToken)
				}

				// set session expiry based on token expiry
				if !token.Expiry.IsZero() {
					session.Options(sessions.Options{MaxAge: int(time.Until(token.Expiry).Seconds())})
				}
				session.Save()

				c.String(200, "Session created")
				c.Abort()
				return
			}

			// Fallback to legacy Gamma token endpoint if configured
			tokenURI := os.Getenv("GAMMA_TOKEN")
			if tokenURI != "" {
				url := fmt.Sprintf("%s?grant_type=authorization_code&client_id=%s&redirect_uri=%s&code=%s", tokenURI, clientID, redirectURI, req.Code)
				req2, _ := http.NewRequest("POST", url, nil)
				req2.Header.Add("Content-Type", "application/x-www-form-urlencoded")
				// Basic auth header using clientID:clientSecret
				sEnc := ""
				if clientID != "" || clientSecret != "" {
					sEnc = "REDACTED"
				}
				if sEnc != "" {
					req2.Header.Add("Authorization", fmt.Sprintf("Basic %s", sEnc))
				}
				res, err := http.DefaultClient.Do(req2)
				if err != nil {
					genericError(err, c)
					return
				}
				if res.StatusCode == 200 {
					var rr struct {
						AccessToken string `json:"access_token"`
						ExpiresIn   int64  `json:"expires_in"`
					}
					if err := json.NewDecoder(res.Body).Decode(&rr); err != nil {
						genericError(err, c)
						return
					}
					session.Set("token", rr.AccessToken)
					session.Set("cid", "")
					session.Set("isAdmin", false)
					session.Save()
					session.Options(sessions.Options{MaxAge: int(rr.ExpiresIn)})
					c.String(200, "Session created")
					c.Abort()
					return
				}
				c.String(500, "incorrect token")
				c.Abort()
				return
			}

			c.String(400, "no auth provider configured")
			c.Abort()
			return
		}

		c.String(401, "invalid auth flow")
		c.Abort()
	}
}
