package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Question struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	Title         string             `bson:"title,omitempty"`
	Author        string             `bson:"author,omitempty"`
	Answers       []string           `bson:"answers,omitempty"`
	CorrectAnswer int                `bson:"correct,omitempty"`
}

type Textbook struct {
	ID    primitive.ObjectID `bson:"_id,omitempty"`
	Title string             `bson:"title,omitempty"`
	Body  string             `bson:"body,omitempty"`
}

type Topic struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	Textbooks []Textbook         `bson:"textbooks,omitempty"`
	Questions []Question         `bson:"questions,omitempty"`
}
