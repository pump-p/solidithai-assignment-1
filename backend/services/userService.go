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

// GetAllUsers fetches all users from the database
func GetAllUsers(db *mongo.Database) ([]models.User, error) {
	collection := db.Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	var users []models.User
	if err := cursor.All(ctx, &users); err != nil {
		return nil, err
	}

	return users, nil
}

// GetUserByID fetches a user by their ID
func GetUserByID(id string, db *mongo.Database) (models.User, error) {
	collection := db.Collection("users")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.User{}, errors.New("invalid ID format")
	}

	var user models.User
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		return models.User{}, errors.New("user not found")
	}

	return user, nil
}

// CreateUser creates a new user
func CreateUser(user models.User, db *mongo.Database) error {
	collection := db.Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, user)
	return err
}

// UpdateUser updates a user's details
func UpdateUser(id string, updates models.UserUpdate, db *mongo.Database) (models.User, error) {
	collection := db.Collection("users")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.User{}, errors.New("invalid ID format")
	}

	updateData := bson.M{}
	if updates.Email != nil {
		updateData["email"] = *updates.Email
	}
	if updates.Username != nil {
		updateData["username"] = *updates.Username
	}
	if updates.Password != nil {
		hashedPassword, err := utils.HashPassword(*updates.Password)
		if err != nil {
			return models.User{}, err
		}
		updateData["password"] = hashedPassword
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = collection.UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": updateData})
	if err != nil {
		return models.User{}, err
	}

	var updatedUser models.User
	err = collection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&updatedUser)
	if err != nil {
		return models.User{}, err
	}

	return updatedUser, nil
}

// DeleteUser removes a user from the database
func DeleteUser(id string, db *mongo.Database) error {
	collection := db.Collection("users")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errors.New("invalid ID format")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err = collection.DeleteOne(ctx, bson.M{"_id": objectID})
	return err
}
