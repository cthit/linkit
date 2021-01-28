package controllers

import (
	"fmt"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/swexbe/linkit/backend/core"
)

var redirectURI = os.Getenv("REDIRECT_URL")

func handleRedirectShortcut(c *gin.Context) {
	var link core.Link
	id := c.Param("id")
	fmt.Println(id)
	res := db.Where(&core.Link{Shortcut: id}).First(&link)
	if res.Error != nil {
		c.AbortWithStatus(404)
		return
	}
	c.Redirect(302, link.LinkURL)
	ip := c.ClientIP()

	country := c.Request.Header.Get("CF-IPCountry")
	if country == "" {
		// Default to sweden if cloudflare is bork
		country = "SE"
	}

	newSession := core.Session{Link: &link, IP: ip, Timestamp: time.Now(), Country: country}
	db.Create(&newSession)
}

func handleRedirectHome(c *gin.Context) {
	c.Redirect(307, redirectURI)
}

// RoutePublicController sets up routes for Public controller
func RoutePublicController(r *gin.RouterGroup) {
	r.GET("/", handleRedirectHome)
	r.GET("/:id", handleRedirectShortcut)

}
