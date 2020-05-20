package db

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

const mongoURI = "mongodb://localhost:27017" // adapt maybe with flags?

func connectoToDB() (mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		recover()
	}
	return *client, nil
}

func recover() {}

// NOTE: Maybe one function is enough
func GetQuestions(topic string) string {
	// Fetch Questions from mongo
	return "mock"
}

func GetTextbooks(topic string) string {
	// Fetch Questions from mongo
	return "mock"
}

func GetTopics(topic string) string {
	// Fetch Questions from mongo
	return "mock"
}
