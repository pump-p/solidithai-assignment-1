package services

import (
	"context"
	"errors"
	"time"

	"github.com/pump-p/solidithai/crud-go/backend/models"
	"github.com/pump-p/solidithai/crud-go/backend/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Signup registers a new user and returns a token
// Signup registers a new user and returns the user and a JWT token
func Signup(user models.User, db *mongo.Database) (models.User, string, error) {
	collection := db.Collection("users")

	// Check if the email already exists
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var existingUser models.User
	err := collection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&existingUser)
	if err == nil {
		return models.User{}, "", errors.New("email already in use")
	}

	// Hash the password
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return models.User{}, "", err
	}
	user.Password = hashedPassword

	// Insert the user into the database
	result, err := collection.InsertOne(ctx, user)
	if err != nil {
		return models.User{}, "", err
	}

	// Retrieve the inserted user's ID
	user.ID = result.InsertedID.(primitive.ObjectID)

	// Generate a JWT token for the user
	token, err := utils.GenerateJWT(user.Email)
	if err != nil {
		return models.User{}, "", err
	}

	return user, token, nil
}

// Login authenticates a user and returns a token and user data
func Login(email, password string, db *mongo.Database) (string, models.User, error) {
	collection := db.Collection("users")

	var user models.User
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Find user by email
	err := collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		return "", models.User{}, errors.New("invalid credentials")
	}

	// Validate password
	if !utils.CheckPasswordHash(password, user.Password) {
		return "", models.User{}, errors.New("invalid credentials")
	}

	// Generate JWT
	token, err := utils.GenerateJWT(user.Email)
	if err != nil {
		return "", models.User{}, err
	}

	return token, user, nil
}

// Logout blacklists the token
func Logout(token string) error {
	return utils.BlacklistToken(token)
}
