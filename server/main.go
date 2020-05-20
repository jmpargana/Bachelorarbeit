package main

import (
	"flag"
	"fmt"
	"github.com/jmpargana/Bachelorarbeit/server/router"
	"log"
	"net/http"
)

var port = flag.Int("p", 8080, "port to run app")

func main() {

	flag.Parse()

	r := router.Router()

	fmt.Printf("Starting server of the port %d\n", *port)

	log.Fatal(http.ListenAndServe(":8080", r))
}
