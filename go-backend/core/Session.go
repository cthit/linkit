package core

import (
	"time"

	"gorm.io/gorm"
)

type Session struct {
	gorm.Model
	LinkRef   int64
	Link      *Link `gorm:"foreignKey:LinkRef"`
	IP        string
	Timestamp time.Time
	Country   string
}
