package controllers

import (
	"fmt"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/swexbe/linkit/backend/core"
	"gorm.io/gorm"
)

var db *gorm.DB
var v *validator.Validate

type addLinkBody struct {
	Shortcut string `json:"shortcut" validate:"required,max=20,min=1,alphanum"`
	LinkURL  string `json:"linkurl" validate:"required,uri"`
}

func handleAddLink(c *gin.Context) {
	session := sessions.Default(c)
	cid := session.Get("cid").(string)
	var bodyStruct addLinkBody
	c.BindJSON(&bodyStruct)
	fmt.Printf("%s\n", bodyStruct.LinkURL)
	err := v.Struct(bodyStruct)
	if err != nil {
		c.AbortWithError(400, err)
		return
	}
	newLink := core.Link{Shortcut: bodyStruct.Shortcut, LinkURL: bodyStruct.LinkURL, Creator: cid}

	res := db.Create(&newLink)
	if res.Error != nil {
		c.AbortWithError(400, res.Error)
		return
	}
	c.JSON(200, newLink)
}

func handleDeleteLink(c *gin.Context) {
	session := sessions.Default(c)
	cid := session.Get("cid").(string)
	isAdmin := session.Get("isAdmin").(bool)
	var link core.Link
	id := c.Param("id")
	res := db.Where(&core.Link{Shortcut: id}).First(&link)
	if res.Error != nil {
		c.AbortWithError(500, res.Error)
		return
	}
	if link.Creator != cid && !isAdmin {
		c.AbortWithStatus(403)
		return
	}
	db.Delete(&link)
	if res.Error != nil {
		c.AbortWithError(500, res.Error)
		return
	}
	c.Status(200)

}

func handleGetLinks(c *gin.Context) {
	session := sessions.Default(c)
	cid := session.Get("cid").(string)
	var links []core.Link
	res := db.Where(&core.Link{Creator: cid}).Find(&links)
	if res.Error != nil {
		c.AbortWithError(500, res.Error)
		return
	}
	c.JSON(200, links)

}

func handleGetAllLinks(c *gin.Context) {
	session := sessions.Default(c)
	isAdmin := session.Get("isAdmin").(bool)
	if !isAdmin {
		c.AbortWithStatus(403)
		return
	}
	var links []core.Link
	res := db.Find(&links)
	if res.Error != nil {
		c.AbortWithStatus(500)
		return
	}
	c.JSON(200, links)

}

// RouteLinkController sets up routes for Link controller
func RouteLinkController(r *gin.RouterGroup, _db *gorm.DB) {
	db = _db
	v = validator.New()
	r.GET("/", handleGetLinks)
	r.POST("/", handleAddLink)
	r.DELETE("/:id", handleDeleteLink)
	r.GET("/all", handleGetAllLinks)

}
