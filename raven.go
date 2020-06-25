package main

import (
	"fmt"
	"github.com/cloudlibz/raven/platform/routes"
	"github.com/gorilla/handlers"
	"net/http"
)

func main() {
	fmt.Println("Starting Raven ...")
	r := routes.Route()
	http.Handle("/", r)
	headers:= handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"})
	methods:= handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS","DELETE"})
	origins:=  handlers.AllowedOrigins([]string{"*"})
	http.ListenAndServe(":3003", handlers.CORS(headers,methods ,origins)(r))
}
