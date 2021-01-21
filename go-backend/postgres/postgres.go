package postgres

import (
	"github.com/go-pg/pg/v10"
	"github.com/go-pg/pg/v10/orm"
	"github.com/swexbe/linkit/backend/core"
)

func Init() {
	db := pg.Connect(&pg.Options{
		Addr:     "0.0.0.0:5432",
		User:     "postgres",
		Password: "example",
		Database: "bookit",
	})
	defer db.Close()

	err := createSchema(db)
	if err != nil {
		panic(err)
	}

}

// createSchema creates database schema for User and Story models.
func createSchema(db *pg.DB) error {
	models := []interface{}{&core.Link{}, &core.Session{}}

	for _, model := range models {
		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
			Temp:        false,
			IfNotExists: true,
		})
		if err != nil {
			return err
		}
	}
	return nil
}
