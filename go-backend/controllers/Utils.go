package controllers

import (
	"github.com/swexbe/linkit/backend/core"
)

func isOwner(shortcut string, cid string) (bool, core.Link, error) {
	var link core.Link
	res := db.Where(&core.Link{Shortcut: shortcut}).First(&link)
	if res.Error != nil {
		return false, core.Link{}, res.Error
	}
	return (cid == link.Creator), link, nil

}
