package db

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

// collection is a GLOBAL variable in the DB package.
// It is a pointer to the mongo client and allows other functions inside
// this package to perform CRUD methods on it
var database *mongo.Database

// ConnectToDB will be called to main to create a global variable, which
// is a pointer to the MongoDB collection
func ConnectToDB(mongoURI string) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	log.Printf("Connecting to database in: %s", mongoURI)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))

	if err != nil {
		log.Fatal(err)
	}

	if client.Ping(context.TODO(), nil); err != nil {
		log.Fatal(err)
	}

	log.Printf("Connected to database in: %s", mongoURI)

	database = client.Database("Bachelorarbeit")
}
