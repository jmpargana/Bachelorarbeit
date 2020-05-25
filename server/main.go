package main

import (
	"flag"
	"fmt"
	"github.com/gorilla/handlers"
	"log"
	"net/http"
	"server/db"
	"server/router"
	"time"
)

var (
	port  = flag.Int("p", 8080, "Chosen Port to run App")
    host = flag.String("h", "0.0.0.0", "host address to run app")
	mongo = flag.String("m", "mongodb://app:27017", "Your MongoDB URI")
)

func main() {

	flag.Parse() // Check if user provided any CMD-Arguments

	r := router.Router() // Load all Routes

	db.ConnectToDB(*mongo) // Initiate connection to mongodb

	log.Printf("Starting server in port: %d\n", *port)

	spa := router.SpaHandler{StaticPath: "../client/build", IndexPath: "index.html"}
	r.PathPrefix("/").Handler(spa)

	srv := &http.Server{
		Handler: handlers.CORS()(r),
        Addr:    fmt.Sprintf(":%d", *port),
		// Good practice: enforce timeouts for servers you create
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())

	// Start server
	// log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), handlers.CORS()(r)))
}
