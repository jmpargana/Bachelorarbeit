package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"server/db"
	"server/router"
)

var (
	port  = flag.Int("p", 8080, "Chosen Port to run App")
	mongo = flag.String("mongo", "mongodb://localhost:27017", "Your MongoDB URI")
)

func main() {

	flag.Parse() // Check if user provided any CMD-Arguments

	r := router.Router() // Load all Routes

	db.ConnectToDB(*mongo) // Initiate connection to mongodb

	log.Printf("Starting server in port: %d\n", *port)

	// Start server
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), r))
}
