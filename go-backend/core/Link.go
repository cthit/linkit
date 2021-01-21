package core

type Link = struct {
	Id        int64
	tableName struct{} `pg:"Links"`
	Shortcut  string   `pg:,pk`
	LinkURL   string
	Creator   string
}
