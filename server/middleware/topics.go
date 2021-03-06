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

	log.Printf("Call to fetch all topics from: %s", r.URL.Path)

	w.Header().Set("Content-Type", "application/json")

	payload, err := db.GetTopics()
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(payload)
}

// PostTopic calls the insertOne method from the db package.
func PostTopic(w http.ResponseWriter, r *http.Request) {

	log.Printf("Call to upload new topic from: %s", r.URL.Path)

	var topic models.Topic

	_ = json.NewDecoder(r.Body).Decode(&topic)

	if err := db.PostTopic(topic); err != nil {

		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Something bad happened!"))
	}
}

// DeleteTopic calls the db package method DeleteTopic which deletes entry given an ID.
func DeleteTopic(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	if err := db.DeleteQuestion(vars["questionID"]); err != nil {

		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("500 - Something bad happened!"))
	}
}
