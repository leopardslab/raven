package main

import (
	"fmt"
	"github.com/cloudlibz/raven/platform/routes"
	"net/http"
)

func main() {
	fmt.Println("Starting Raven ...")
	r := routes.Route()
	http.Handle("/", r)
	http.ListenAndServe(":3003", r)
}


