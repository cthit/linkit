package postgres

import (
	"github.com/swexbe/linkit/backend/core"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

func Init() *gorm.DB {
	dsn := "host=0.0.0.0 user=postgres password=example dbname=bookit port=5432 sslmode=disable TimeZone=Europe/Stockholm"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(core.Link{})
	db.AutoMigrate(core.Session{})

	return db
}
