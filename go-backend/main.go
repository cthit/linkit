package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/swexbe/linkit/backend/postgres"
)

var router *gin.Engine

func init() {
	postgres.Init()
	router = gin.New()
	router.NoRoute(noRouteHandler())

}

func main() {
	fmt.Println("Server Running on Port: ", 9090)
	http.ListenAndServe(":9090", router)
}

func noRouteHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.String(404, "Not found")
	}
}
