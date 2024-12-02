package controllers

import (
	"net/http"

	"github.com/pump-p/solidithai/crud-go/backend/models"
	"github.com/pump-p/solidithai/crud-go/backend/services"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

// Signup handles user registration
func Signup(c echo.Context) error {
	db := c.Get("db").(*mongo.Database)

	var user models.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	user, token, err := services.Signup(user, db)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	// Remove password before sending the response
	user.Password = ""
	return c.JSON(http.StatusCreated, map[string]interface{}{
		"user":  user,
		"token": token,
	})
}

// Login handles user authentication
func Login(c echo.Context) error {
	db := c.Get("db").(*mongo.Database)

	var credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := c.Bind(&credentials); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	token, user, err := services.Login(credentials.Email, credentials.Password, db)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": err.Error()})
	}

	user.Password = "" // Exclude password in response
	return c.JSON(http.StatusOK, map[string]interface{}{
		"token": token,
		"user":  user,
	})
}

// Logout handles user logout
func Logout(c echo.Context) error {
	token := c.Request().Header.Get("Authorization")
	if token == "" {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Authorization token required"})
	}

	err := services.Logout(token)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "User logged out successfully"})
}
