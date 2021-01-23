package core

import "gorm.io/gorm"

type Link struct {
	gorm.Model
	Shortcut string `gorm:"uniqueIndex" json:"shortcut"`
	LinkURL  string `json:"linkurl"`
	Creator  string `json:"creatorUID"`
}
