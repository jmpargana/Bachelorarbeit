package middleware

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"server/db"
)

func GetTopics(w http.ResponseWriter, r *http.Request) {
	// Load from mongodb
	payload := db.GetTopics()
	json.NewEncoder(w).Encode(payload)
}

func PostTopic(w http.ResponseWriter, r *http.Request) {
	// Process json data
	// Post request
	// db.PostTopic(jsonData)
	// Return status
}

func DeleteTopic(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.DeleteTopic(vars["topicID"])
	// return status
}
