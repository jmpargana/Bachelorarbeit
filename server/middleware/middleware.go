// For PDF converter use
// https://github.com/sajari/docconv

package middleware

import (
	"encoding/json"
	"net/http"
	"server/db"
)

func TestHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello"))
}

// Question GET, POST, DELETE
func GetQuestions(w http.ResponseWriter, r *http.Request) {
	// Load from mongodb
	payload := db.GetQuestions("NameOfTopic")
	json.NewEncoder(w).Encode(payload)
}

func PostQuestion(w http.ResponseWriter, r *http.Request) {
	// db.PostQuestion(r)
}

func DeleteQuestion(w http.ResponseWriter, r *http.Request) {
	// db.DeleteQuestion(r)
}

// Textbook GET, POST, DELETE
func GetTextbooks(w http.ResponseWriter, r *http.Request) {
	// Load from mongodb
	payload := db.GetTextbooks("NameOfTopic")
	json.NewEncoder(w).Encode(payload)
}

// Topic GET, POST
func GetTopics(w http.ResponseWriter, r *http.Request) {
	// Load from mongodb
	payload := db.GetTopics("NameOfTopic")
	json.NewEncoder(w).Encode(payload)
}
