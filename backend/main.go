package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/pump-p/solidithai/crud-go/backend/config"
	"github.com/pump-p/solidithai/crud-go/backend/routes"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// Database connection
	db := config.ConnectDB()

	// Initialize Echo
	e := echo.New()

	// Apply CORS middleware globally
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{"http://localhost:3000"}, // Frontend origin
		AllowMethods:     []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders:     []string{echo.HeaderAuthorization, echo.HeaderContentType},
		AllowCredentials: true,
	}))

	// Set up routes
	routes.SetupRouter(e, db)

	// Start the server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}
	log.Printf("Starting server on port %s...", port)
	if err := e.Start(":" + port); err != nil {
		log.Fatal(err)
	}
}
