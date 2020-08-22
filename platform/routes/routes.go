package routes

import (
	"github.com/cloudlibz/raven/internal/check"
	"github.com/cloudlibz/raven/internal/space"
	"github.com/cloudlibz/raven/platform/auth"
	"github.com/cloudlibz/raven/platform/middleware"
	"github.com/gorilla/mux"
	"net/http"
)

func Route() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/", getWelcome).Methods("GET")
	r.HandleFunc("/metrics", middleware.RequireAuth(getMetrics)).Methods("GET") // GET /metrics
	r.HandleFunc("/space", middleware.RequireAuth(space.CreateSpace)).Methods("POST")
	r.HandleFunc("/spaces", middleware.RequireAuth(space.GetAllSpace)).Methods("GET")
	r.HandleFunc("/space/{id}", middleware.RequireAuth(space.GetSpace)).Methods("GET")
	r.HandleFunc("/space", middleware.RequireAuth(space.UpdateSpace)).Methods("PUT")
	r.HandleFunc("/oauth/redirect", auth.GetAuthClient).Methods("GET")
	r.HandleFunc("/space/{id}", middleware.RequireAuth(space.GetSpace)).Methods("GET")
	r.HandleFunc("/space/run", middleware.RequireAuth(space.RunSpace)).Methods("POST")
	r.HandleFunc("/checks", middleware.RequireAuth(check.GetAllChecks)).Methods("GET")
	r.HandleFunc("/check", middleware.RequireAuth(check.CreateCheck)).Methods("POST")
	r.HandleFunc("/check/{id}", middleware.RequireAuth(check.StartCheck)).Methods("POST")
	return r
}

// GetMetrics Returns list of metrics
func getMetrics(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Metrics"))
}

// Welcome message
func getWelcome(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Metrics"))
}
