package core

import (
	"net"
	"time"
)

type Session = struct {
	Id        int64
	tableName struct{} `pg:"Sessions"`
	Link      *Link    `pg:"rel:has-one"`
	IP        net.IP
	Timestamp time.Time
	Country   string
}
