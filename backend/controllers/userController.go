package controllers

import (
	"net/http"

	"github.com/pump-p/solidithai/crud-go/backend/models"
	"github.com/pump-p/solidithai/crud-go/backend/services"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

// GetUsers handles fetching all users
func GetUsers(c echo.Context) error {
	db := c.Get("db").(*mongo.Database)

	users, err := services.GetAllUsers(db)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch users"})
	}

	return c.JSON(http.StatusOK, users)
}

// GetUserByID fetches a specific user by ID
func GetUserByID(c echo.Context) error {
	db := c.Get("db").(*mongo.Database)
	id := c.Param("id")

	user, err := services.GetUserByID(id, db)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "User not found"})
	}

	user.Password = "" // Exclude password in response
	return c.JSON(http.StatusOK, user)
}

// CreateUser creates a new user
func CreateUser(c echo.Context) error {
	db := c.Get("db").(*mongo.Database)

	var user models.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	err := services.CreateUser(user, db)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create user"})
	}

	return c.JSON(http.StatusCreated, map[string]string{"message": "User created successfully"})
}

// UpdateUser updates a user's details
func UpdateUser(c echo.Context) error {
	db := c.Get("db").(*mongo.Database)
	id := c.Param("id")

	var userUpdates models.UserUpdate
	if err := c.Bind(&userUpdates); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	user, err := services.UpdateUser(id, userUpdates, db)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to update user"})
	}

	user.Password = "" // Exclude password in response
	return c.JSON(http.StatusOK, user)
}

// DeleteUser deletes a user by ID
func DeleteUser(c echo.Context) error {
	db := c.Get("db").(*mongo.Database)
	id := c.Param("id")

	err := services.DeleteUser(id, db)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to delete user"})
	}

	return c.JSON(http.StatusOK, map[string]string{"message": "User deleted successfully"})
}
