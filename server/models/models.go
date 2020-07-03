package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Question is the JSON struct to be transported in any request
// as well as being saved in mongo.
type Question struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Question      string             `bson:"question,omitempty" json:"question,omitempty"`
	Topic         primitive.ObjectID `bson:"topicID,omitempty" json:"topicID,omitempty"`
	Author        string             `bson:"userEmail,omitempty" json:"userEmail,omitempty"`
	Answers       []string           `bson:"answers,omitempty" json:"answers,omitempty"`
	CorrectAnswer int                `bson:"correct" json:"correct"`
}

// Textbook is the JSON struct to be transported in any request
// as well as being saved in mongo.
type Textbook struct {
	ID     primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Title  string             `bson:"title,omitempty" json:"title,omitempty"`
	Topic  primitive.ObjectID `bson:"topicID,omitempty" json:"topicID,omitempty"`
	Author string             `bson:"userEmail,omitempty" json:"userEmail,omitempty"`
	Body   string             `bson:"body" json:"body"`
}

// Topic is the JSON struct to be transported in any request
// as well as being saved in mongo.
type Topic struct {
	ID   primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Name string             `bson:"name,omitempty" json:"name,omitempty"`

	// This is not needed for now.
	// It might be needed with the Alexa API calls

	// Textbooks []Textbook         `bson:"textbooks,omitempty" json:"textbooks,omitempty"`
	// Questions []Question         `bson:"questions,omitempty" json:"questions,omitempty"`
}
