package routes

import (
	"github.com/labstack/echo/v4"
	"github.com/pump-p/solidithai/crud-go/backend/controllers"
	"github.com/pump-p/solidithai/crud-go/backend/middleware"
	"go.mongodb.org/mongo-driver/mongo"
)

// SetupRouter configures the routes for the application
func SetupRouter(e *echo.Echo, db *mongo.Database) {
	// Pass the database instance to the context
	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("db", db)
			return next(c)
		}
	})

	// Authentication Routes
	authGroup := e.Group("/auth")
	authGroup.POST("/signup", controllers.Signup)
	authGroup.POST("/login", controllers.Login)

	// User Routes
	userGroup := e.Group("/users", middleware.AuthMiddleware())
	userGroup.GET("", controllers.GetUsers)
	userGroup.GET("/:id", controllers.GetUserByID)
	userGroup.POST("", controllers.CreateUser)
	userGroup.PUT("/:id", controllers.UpdateUser)
	userGroup.DELETE("/:id", controllers.DeleteUser)
}
