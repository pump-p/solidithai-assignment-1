package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// User represents the schema for a user in the database
type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Username string             `bson:"username" json:"username"`
	Email    string             `bson:"email" json:"email"`
	Password string             `bson:"password,omitempty" json:"password,omitempty"`
}

// UserUpdate represents the fields that can be updated for a user
type UserUpdate struct {
	Email    *string `json:"email,omitempty"`
	Username *string `json:"username,omitempty"`
	Password *string `json:"password,omitempty"`
}
