package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
)

func main() {
	fmt.Println("Starting Raven ...")

	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome ..."))
	})

	r.Route("/api/v1", func(r chi.Router) {
		r.Get("/metrics", GetMetrics) // GET /metrics
	})

	http.ListenAndServe(":3003", r)
}

// GetMetrics Returns list of metrics
func GetMetrics(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Metrics"))
}
