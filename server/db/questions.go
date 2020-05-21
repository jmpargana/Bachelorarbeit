package db

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"server/models"
)

// Get all the topic's questions from Mongo and format them in json.
func GetQuestions(topic string) ([]models.Question, error) {

	var questions []models.Question

	cur, err := collection.Find(context.TODO(), bson.M{"topic": topic})
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

	if _, err := collection.InsertOne(context.TODO(), question); err != nil {
		return err
	}

	return nil
}

// DeleteQuestion deletes a question from database given its id.
func DeleteQuestion(questionID string) error {

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
