package router

import (
	"github.com/gorilla/mux"
	"server/middleware"
)

// Router returns a multiplexer router defined in the  gorilla framework.
// It contains all routes and calls the needed middleware functions to manipulate
// the data.
func Router() *mux.Router {

	router := mux.NewRouter()

	// GET REQUESTS
	router.HandleFunc("/api/questions/{topicID}", middleware.GetQuestions).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/textbooks/{topicID}", middleware.GetTextbooks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/topics", middleware.GetTopics).Methods("GET", "OPTIONS")

	// POST REQUESTS
	router.HandleFunc("/api/topic", middleware.PostTopic).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/question", middleware.PostQuestion).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/textbook", middleware.PostTextbook).Methods("POST", "OPTIONS")

	// DELETE REQUESTS
	router.HandleFunc("/api/topics/{topicID}", middleware.DeleteTopic).Methods("DELETE")
	router.HandleFunc("/api/question/{questionID}", middleware.DeleteQuestion).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/textbook/{textbookID}", middleware.DeleteTextbook).Methods("DELETE", "OPTIONS")

	// Convert PDF to Text
	router.HandleFunc("/api/converter", middleware.Converter).Methods("POST", "OPTIONS")

	return router
}
