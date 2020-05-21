package middleware

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"server/db"
)

// GetQuestions performs the GET request to fetch all Questions
// of a given topic
func GetQuestions(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	payload := db.GetQuestions(vars["topicID"])
	json.NewEncoder(w).Encode(payload)
}

func PostQuestion(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	// process json data
	// db.PostQuestion(vars["topicID"], jsonData)
	// return status
}

func DeleteQuestion(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.DeleteQuestion(vars["topicID"], vars["questionID"])
	// return status
}
