// For PDF converter use
// https://github.com/sajari/docconv
package middleware

import "net/http"

func TestHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello"))
}
