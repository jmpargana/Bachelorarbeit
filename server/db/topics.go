package db

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"server/models"
)

// Get all Topics from db.
func GetTopics() ([]models.Topic, error) {

	var topics []models.Topic

	cur, err := collection.Find(context.TODO(), bson.M{})
	if err != nil {
		return nil, err
	}

	defer cur.Close(context.TODO())

	// Load one-by-one
	for cur.Next(context.TODO()) {

		var topic models.Topic

		if err := cur.Decode(&topic); err != nil {
			log.Fatal(err)
		}

		topics = append(topics, topic)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	return topics, nil
}

// PostTopic creates a new entry with a topic name in the database.
func PostTopic(topic models.Topic) error {

	if _, err := collection.InsertOne(context.TODO(), topic); err != nil {
		return err
	}

	return nil
}

// DeleteTopic deletes an entry from the database.
func DeleteTopic(topicID string) error {

	id, err := primitive.ObjectIDFromHex(topicID)
	if err != nil {
		return err
	}

	filter := bson.M{"_id": id}

	_, err = collection.DeleteOne(context.TODO(), filter)
	if err != nil {
		return err
	}

	return nil
}
