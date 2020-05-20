package router

import (
	"github.com/gorilla/mux"
	"server/middleware"
)

func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/question", middleware.TestHandler).Methods("Get", "OPTIONS")

	return router
}
