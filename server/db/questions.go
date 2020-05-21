package db

import (
	"server/models"
)

// Get all the Topics from Mongo and format them in json.
func GetQuestions(topic string) []models.Question {
	// Fetch Questions from mongo
	return nil
}

func DeleteQuestion(topicID, questionID string) bool {
	return true
}
