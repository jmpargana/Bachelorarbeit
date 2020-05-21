package middleware

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"server/db"
	"server/models"
)

// GetTopics calls the GetTopic method in database which finds all available entries.
func GetTopics(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	payload, err := db.GetTopics()
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(payload)
}

// PostTopic calls the insertOne method from the db package.
func PostTopic(w http.ResponseWriter, r *http.Request) {

	var topic models.Topic

	_ = json.NewDecoder(r.Body).Decode(&topic)

	if err := db.PostTopic(topic); err != nil {
		// return status 500
	}

	// return status 200
}

// DeleteTopic calls the db package method DeleteTopic which deletes entry given an ID.
func DeleteTopic(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	if err := db.DeleteQuestion(vars["questionID"]); err != nil {
		// return status err
	}

	// return status
}
