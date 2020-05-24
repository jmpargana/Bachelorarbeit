package middleware

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"server/db"
	"server/models"
)

// GetQuestions performs the GET request to fetch all Questions
// of a given topic
func GetQuestions(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)

	payload, err := db.GetQuestions(vars["topicID"])
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(payload)
}

// PostQuestion is called with THE POST request verb and creates
// a new entry in database with the given data.
func PostQuestion(w http.ResponseWriter, r *http.Request) {

	var question models.Question

	_ = json.NewDecoder(r.Body).Decode(&question)

	if err := db.PostQuestion(question); err != nil {

		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Something bad happened!"))
	}
}

// DeleteQuestion is called with the DELETE request and sends the given
// question ID to delete entry from database.
func DeleteQuestion(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	if err := db.DeleteQuestion(vars["questionID"]); err != nil {

		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Something bad happened!"))
	}
}
