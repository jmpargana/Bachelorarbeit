package middleware

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"server/db"
	"server/models"
)

// GetTextbooks performs the GET request to fetch all Textbooks
// of a given topic.
func GetTextbooks(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)

	payload, err := db.GetTextbooks(vars["topicID"])
	if err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(payload)
}

// PostTextbook creates new entry in database.
func PostTextbook(w http.ResponseWriter, r *http.Request) {

	var textbook models.Textbook

	_ = json.NewDecoder(r.Body).Decode(&textbook)

	if err := db.PostTextbook(textbook); err != nil {
		// return status 500
	}

	// return status 200
}

// DeleteTextbook calls DeleteTextbook on db and deletes entry given an ID.
func DeleteTextbook(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)

	if err := db.DeleteTextbook(vars["textbookID"]); err != nil {
		// return status err
	}

	// return status
}
