package db

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

// client is a GLOBAL variable in the DB package.
// It is a pointer to the mongo client and allows other functions inside
// this package to perform CRUD methods on it
var client *mongo.Client

// ConnectToDB will be called to main to create a global variable, which
// is a pointer to the MongoDB collection
func ConnectToDB(mongoURI string) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var err error // needs declaration since Client is a global variable in package
	client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}
}
