package db

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"server/models"
)

// Get all the topic's questions from Mongo and format them in json.
func GetQuestions(topicID string) ([]models.Question, error) {

	collection := database.Collection("questions")

	docID, err := primitive.ObjectIDFromHex(topicID)
	if err != nil {
		return nil, err
	}

	var questions []models.Question
	cur, err := collection.Find(context.TODO(), bson.M{"topicID": docID})
	if err != nil {
		return nil, err
	}

	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		var question models.Question

		if err := cur.Decode(&question); err != nil {
			log.Fatal(err)
		}

		questions = append(questions, question)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	return questions, nil
}

// PostQuestion creates a new question in the database.
// It contains the information as describe in the models package.
func PostQuestion(question models.Question) error {

	collection := database.Collection("questions")

	if _, err := collection.InsertOne(context.TODO(), question); err != nil {
		return err
	}

	return nil
}

// DeleteQuestion deletes a question from database given its id.
func DeleteQuestion(questionID string) error {

	collection := database.Collection("questions")

	id, err := primitive.ObjectIDFromHex(questionID)
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
