package router

import (
	"github.com/gorilla/mux"
	"server/middleware"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	// GET REQUESTS
	router.HandleFunc("/api/questions/{topicID}", middleware.GetQuestions).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/textbooks/{topicID}", middleware.GetTextbooks).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/topics", middleware.GetTopics).Methods("GET", "OPTIONS")

	// POST REQUESTS

	// DELETE REQUESTS

	return router
}
