package main

import (
	"time"

	"github.com/gin-gonic/gin"
	"github.com/igorgabriel/api-escola/src/helpers"
	"github.com/igorgabriel/api-escola/src/routes"
	cors "github.com/itsjamie/gin-cors"
	"github.com/sirupsen/logrus"
)

func main() {
	logrus.Infof("==== Starting Escola API ====")

	helpers.InitializeLogs()

	r := gin.Default()
	r.Use(cors.Middleware(cors.Config{
		Origins:         "*",
		Methods:         "GET, PUT, POST, DELETE",
		RequestHeaders:  "Origin, Authorization, Content-Type",
		ExposedHeaders:  "",
		MaxAge:          50 * time.Second,
		Credentials:     true,
		ValidateHeaders: false,
	}))

	routes.InitializeRoutes(r)

	r.Run("0.0.0.0:8000")
}
