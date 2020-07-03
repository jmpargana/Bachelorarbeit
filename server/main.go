package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"server/db"
	"server/router"
	"time"

	"github.com/gorilla/handlers"
)

var (
	port  = os.Getenv("PORT")
	mongo = os.Getenv("MONGO_URI")
)

func main() {

	flag.Parse() // Check if user provided any CMD-Arguments

	r := router.Router() // Load all Routes

	cleanDB := db.ConnectToDB(mongo) // Initiate connection to mongodb
	defer cleanDB()

	log.Printf("Starting server in port: %s\n", port)

	spa := router.SpaHandler{StaticPath: "../client/build", IndexPath: "index.html"}
	r.PathPrefix("/").Handler(spa)

	srv := &http.Server{
		Handler: handlers.CORS()(r),
		Addr:    fmt.Sprintf(":%s", port),
		// Good practice: enforce timeouts for servers you create
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
