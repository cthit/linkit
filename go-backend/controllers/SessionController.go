package controllers

import (
	"fmt"
	"regexp"
	"time"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

var isAlphaNum = regexp.MustCompile(`^[a-zA-Z]+$`).MatchString

type year struct {
	Month  time.Time `json:"month"`
	Clicks int64     `json:"clicks"`
}

func handleGetYear(c *gin.Context) {
	session := sessions.Default(c)
	cid := session.Get("cid").(string)
	isAdmin := session.Get("isAdmin").(bool)
	id := c.Param("id")
	isOwner, link, err := isOwner(id, cid)
	if err != nil {
		c.AbortWithError(500, err)
		return
	}
	if !isOwner && !isAdmin {
		c.AbortWithStatus(403)
		return
	}
	var ret []year

	query := fmt.Sprintf(`SELECT series AS month, COALESCE(clicks, 0) AS clicks
	FROM generate_series((date_trunc('month', current_date) - INTERVAL '12 months')::date, current_date, '1 month'::interval) AS series
	LEFT JOIN
	(SELECT COUNT(id) as clicks, date_trunc('month', timestamp) as month
	FROM sessions
	WHERE timestamp > (current_date - INTERVAL '12 months') AND
	link_ref = %d
	GROUP BY date_trunc('month', timestamp)) AS stats
	ON stats.month = series
	ORDER BY month`, link.ID)

	res := db.Raw(query).Scan(&ret)

	if res.Error != nil {
		c.AbortWithError(500, res.Error)
	}

	c.JSON(200, ret)

}

type month struct {
	Date   time.Time `json:"date"`
	Clicks int64     `json:"clicks"`
}

func handleGetMonth(c *gin.Context) {
	session := sessions.Default(c)
	cid := session.Get("cid").(string)
	isAdmin := session.Get("isAdmin").(bool)
	id := c.Param("id")
	isOwner, link, err := isOwner(id, cid)
	if err != nil {
		c.AbortWithError(500, err)
		return
	}
	if !isOwner && !isAdmin {
		c.AbortWithStatus(403)
		return
	}
	var ret []month

	query := fmt.Sprintf(`SELECT series AS date, COALESCE(clicks, 0) AS clicks
	FROM generate_series((date_trunc('day', current_date) - INTERVAL '1 months')::date, current_date, '1 day'::interval) AS series
	LEFT JOIN
	(SELECT COUNT(id) as clicks, date_trunc('day', timestamp) as date
	FROM sessions
	WHERE date_trunc('month', timestamp) = date_trunc('month', current_date) AND
	link_ref = %d
	GROUP BY date_trunc('day', timestamp)) AS stats
	ON stats.date = series
	ORDER BY date`, link.ID)

	res := db.Raw(query).Scan(&ret)

	if res.Error != nil {
		c.AbortWithError(500, res.Error)
	}

	c.JSON(200, ret)

}

type day struct {
	Hour   int64 `json:"hour"`
	Clicks int64 `json:"clicks"`
}

func handleGetAverageHour(c *gin.Context) {
	session := sessions.Default(c)
	cid := session.Get("cid").(string)
	isAdmin := session.Get("isAdmin").(bool)
	id := c.Param("id")
	isOwner, link, err := isOwner(id, cid)
	if err != nil {
		c.AbortWithError(500, err)
		return
	}
	if !isOwner && !isAdmin {
		c.AbortWithStatus(403)
		return
	}
	var ret []day

	query := fmt.Sprintf(`SELECT series AS hour, COALESCE(clicks, 0) AS clicks
	FROM generate_series(1, 24, 1) AS series
	LEFT JOIN
	(SELECT COUNT(id) as clicks, date_part('hour', timestamp) as hour
	FROM sessions
	WHERE link_ref = %d
	GROUP BY date_part('hour', timestamp)) AS stats
	ON stats.hour = series
	ORDER BY hour`, link.ID)

	res := db.Raw(query).Scan(&ret)

	if res.Error != nil {
		c.AbortWithError(500, res.Error)
	}

	c.JSON(200, ret)

}

type countries struct {
	Clicks string    `json:"clicks"`
	Hour   time.Time `json:"country"`
}

func handleGetCountries(c *gin.Context) {
	session := sessions.Default(c)
	cid := session.Get("cid").(string)
	isAdmin := session.Get("isAdmin").(bool)
	id := c.Param("id")
	isOwner, link, err := isOwner(id, cid)
	if err != nil {
		c.AbortWithError(500, err)
		return
	}
	if !isOwner && !isAdmin {
		c.AbortWithStatus(403)
		return
	}
	var ret []countries

	query := fmt.Sprintf(`SELECT COUNT(id) as clicks, country
	FROM sessions
	WHERE link_ref = %d
	GROUP BY country`, link.ID)

	res := db.Raw(query).Scan(&ret)

	if res.Error != nil {
		c.AbortWithError(500, res.Error)
	}

	c.JSON(200, ret)

}

// RouteSessionController sets up routes for Session controller
func RouteSessionController(r *gin.RouterGroup) {
	r.GET("/:id/year", handleGetYear)
	r.GET("/:id/month", handleGetMonth)
	r.GET("/:id/averageHour", handleGetAverageHour)
	r.GET("/:id/countries", handleGetCountries)

}
