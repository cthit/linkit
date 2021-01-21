package core

import "gorm.io/gorm"

type Link struct {
	gorm.Model
	Shortcut string `gorm:"index"`
	LinkURL  string
	Creator  string
}
