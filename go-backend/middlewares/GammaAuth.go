package middlewares

import (
	b64 "encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

var clientID = os.Getenv("GAMMA_CLIENT_ID")
var clientSecret = os.Getenv("GAMMA_CLIENT_SECRET")
var tokenURI = os.Getenv("GAMMA_TOKEN")
var authorizationURI = os.Getenv("GAMMA_AUTH")
var redirectURI = os.Getenv("GAMMA_REDIRECT")

type code struct {
	Code string `json:"code" binding:"required"`
}

type resp struct {
	AccessToken string `json:"access_token" binding:"required"`
	ExpiresIn   int64  `json:"expires_in" binding:"required"`
}

func genericError(err error, c *gin.Context) {
	fmt.Println(err.Error())
	c.String(500, "Internal server error")
	c.Abort()
}

func contains(slice []string, item string) bool {
	set := make(map[string]struct{}, len(slice))
	for _, s := range slice {
		set[s] = struct{}{}
	}

	_, ok := set[item]
	return ok
}

// GammaAuth is a gin middleware which handles authentication with gamma
func GammaAuth() gin.HandlerFunc {
	gammaURI := fmt.Sprintf("%s?response_type=code&client_id=%s&redirect_uri=%s", authorizationURI, clientID, redirectURI)
	return func(c *gin.Context) {
		session := sessions.Default(c)

		// User is authenticated
		if session.Get("token") != nil {
			fmt.Println("logged in")
			c.Next()
			return
		}
		var code code

		// User is trying to authenticate
		if c.Request.URL.Path == "/api/auth" && c.Request.Method == "POST" {
			err := c.BindJSON(&code)
			if err != nil {
				genericError(err, c)
				return
			}

			url := fmt.Sprintf("%s?grant_type=authorization_code&clied_id=%s&redirect_uri=%s&code=%s", tokenURI, clientID, redirectURI, code.Code)
			fmt.Println(url)
			req, _ := http.NewRequest("POST", url, nil)

			req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
			sEnc := b64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", clientID, clientSecret)))
			req.Header.Add("Authorization", fmt.Sprintf("Basic %s", sEnc))

			res, err := http.DefaultClient.Do(req)
			var resp resp
			if err != nil {
				genericError(err, c)
				return
			}
			if res.StatusCode == 200 {
				err = json.NewDecoder(res.Body).Decode(&resp)
				if err != nil {
					genericError(err, c)
					return
				}
				// Success!
				fmt.Println(resp.AccessToken)
				parser := new(jwt.Parser)
				token, _, _ := parser.ParseUnverified(resp.AccessToken, jwt.MapClaims{})

				// Get username
				userName := token.Claims.(jwt.MapClaims)["user_name"]
				strUserName := userName.(string)

				// User is in list of admins?
				admins := os.Getenv("ADMINS")
				adminsSlice := strings.Split(admins, ",")
				isAdmin := contains(adminsSlice, strUserName)

				fmt.Println(strUserName)
				session.Set("token", resp.AccessToken)
				session.Set("cid", strUserName)
				session.Set("isAdmin", isAdmin)
				session.Save()
				session.Options(sessions.Options{MaxAge: int(resp.ExpiresIn)})
				c.String(200, "Session created")
				c.Abort()

			} else {
				fmt.Println(res.StatusCode)
				c.String(500, "incorrect token")
				c.Abort()
			}

		} else {
			c.String(401, gammaURI)
			c.Abort()
		}

	}
}
