package main

import (
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/redis"
	"github.com/gin-gonic/gin"
	"github.com/swexbe/linkit/backend/controllers"
	"github.com/swexbe/linkit/backend/core"
	"github.com/swexbe/linkit/backend/middlewares"
	"github.com/swexbe/linkit/backend/postgres"
)

var router *gin.Engine

func init() {
	db := postgres.Init()

	l1 := &core.Link{
		Shortcut: "hej",
		LinkURL:  "google.se",
		Creator:  "kalle",
	}

	s1 := &core.Session{
		Link:      l1,
		IP:        "1.1.1.1",
		Country:   "SE",
		Timestamp: time.Now(),
	}

	db.Create(l1)
	db.Create(s1)

}

func panicIfErr(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {

	r := gin.Default()
	// Init session middleware
	store, err := redis.NewStore(10, "tcp", "localhost:6379", "", []byte("secret"))
	panicIfErr(err)
	r.Use(sessions.Sessions("LinkITSession", store))
	r.Use(middlewares.GammaAuth())

	userGroup := r.Group("/user")

	controllers.RouteUserController(userGroup)
	r.GET("/hello", func(c *gin.Context) {
		c.String(200, "hello")
	})

	r.Run(":4000")

}
