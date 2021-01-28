package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
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

type userResp struct {
	Nick      string `json:"nick" binding:"required"`
	AvatarURL string `json:"avatarUrl" binding:"required"`
	Cid       string `json:"cid" binding:"required"`
	IsAdmin   interface{}
}

var meURI = os.Getenv("GAMMA_ME")

func handleGetMe(c *gin.Context) {

	if isDev == "true" {
		c.JSON(200, gin.H{"nick": "admin", "cid": "admin", "avatarUrl": "https://homepages.cae.wisc.edu/~ece533/images/airplane.png"})
		return
	}

	session := sessions.Default(c)
	token := session.Get("token")
	fmt.Println(token)
	req, _ := http.NewRequest("GET", meURI, nil)
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", token))

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		genericError(err, c)
		return
	}
	if res.StatusCode == 200 {

		var resp userResp
		err = json.NewDecoder(res.Body).Decode(&resp)
		if err != nil {
			genericError(err, c)
			return
		}
		resp.IsAdmin = session.Get("isAdmin")
		c.JSON(200, resp)

	} else {
		fmt.Println(res.StatusCode)
		c.String(500, "incorrect token")
		c.Abort()
	}

}

// RouteUserController sets up routes for User controller
func RouteUserController(r *gin.RouterGroup) {
	r.GET("/me", handleGetMe)
}
