package controllers

import (
	"fmt"
	"os"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

var isDev = os.Getenv("DEV")

func genericError(err error, c *gin.Context) {
	fmt.Println(err.Error())
	c.String(500, "Internal server error")
	c.Abort()
}

func handleGetMe(c *gin.Context) {
	if isDev == "true" {
		c.JSON(200, gin.H{"isAdmin": true, "nick": "admin", "cid": "admin", "avatarUrl": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"})
		return
	}

	session := sessions.Default(c)
	token := session.Get("token")
	if token == nil {
		c.String(401, "not authenticated")
		return
	}

	cidRaw := session.Get("cid")
	isAdminRaw := session.Get("isAdmin")

	cid := ""
	if cidRaw != nil {
		cid = cidRaw.(string)
	}

	isAdmin := false
	if isAdminRaw != nil {
		isAdmin = isAdminRaw.(bool)
	}

    nick := cid
    if n := session.Get("nick"); n != nil {
        if s, ok := n.(string); ok && s != "" {
            nick = s
        }
    }

    avatar := ""
    if a := session.Get("avatarUrl"); a != nil {
        if s, ok := a.(string); ok && s != "" {
            avatar = s
        }
    }

    c.JSON(200, gin.H{"isAdmin": isAdmin, "nick": nick, "cid": cid, "avatarUrl": avatar})
}

// RouteUserController sets up routes for User controller
func RouteUserController(r *gin.RouterGroup) {
    r.GET("/me", handleGetMe)
}

func HandleGetMe(c *gin.Context) {
    handleGetMe(c)
}
