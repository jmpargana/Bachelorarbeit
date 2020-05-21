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
	router.HandleFunc("/api/topic", middleware.PostTopic).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/question/{topicID}", middleware.PostQuestion).Methods("POST", "OPTIONS")
	router.HandleFunc("/api/textbook/{topicID}", middleware.PostTextbook).Methods("POST", "OPTIONS")

	// DELETE REQUESTS
	router.HandleFunc("/api/topics/{topicID}", middleware.DeleteTopic).Methods("DELETE")
	router.HandleFunc("/api/topic/{topicID}/question/{questionID}", middleware.DeleteQuestion).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/api/topic/{topicID}/textbook/{textbookID}", middleware.DeleteTextbook).Methods("DELETE", "OPTIONS")

	return router
}
