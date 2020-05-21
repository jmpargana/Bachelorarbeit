package middleware

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
	"server/db"
)

// GetTextbooks performs the GET request to fetch all Textbooks
// of a given topic.
func GetTextbooks(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	payload := db.GetTextbooks(vars["topicID"])
	json.NewEncoder(w).Encode(payload)
}

func PostTextbook(w http.ResponseWriter, r *http.Request) {
	// vars := mux.Vars(r)
	// process json data
	// db.PostTextbook(vars["topicID"], jsonData)
	// return status
}

func DeleteTextbook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	db.DeleteTextbook(vars["topicID"], vars["textbookID"])
	// return status
}
