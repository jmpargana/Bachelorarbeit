package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"server/router"
)

var port = flag.Int("p", 8080, "port to run app")

func main() {

	flag.Parse()

	r := router.Router()

	fmt.Printf("Starting server of the port %d\n", *port)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), r))
}
