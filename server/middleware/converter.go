package middleware

import (
	"encoding/json"
	"github.com/sajari/docconv"
	"log"
	"net/http"
)

// Converter takes a body with a PDF File and extracts/converts
// it into raw text, sending it in the response to the client.
func Converter(w http.ResponseWriter, r *http.Request) {

	// Read file from POST request
	file, handler, err := r.FormFile("textbook")
	if err != nil {
		log.Fatalf("failed retrieving the PDF file: %v", err)
		return
	}
	defer file.Close()

	// Convert to TEXT
	res, err := docconv.ConvertPath(handler.Filename)
	if err != nil {
		log.Fatalf("failed converting file: %v", err)
	}

	// Upload file to client
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(res)
}
