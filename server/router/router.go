package router

import (
	"../middleware"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/question", middleware.GetAllQuestions).Methods("Get", "OPTIONS")

	return router
}
