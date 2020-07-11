package space

import (
	"encoding/json"
	"fmt"
	"github.com/cloudlibz/raven/internal/metrics"
	"github.com/cloudlibz/raven/platform/elasticsearch"
	"github.com/gorilla/mux"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

type Header struct {
	ID    string
	Field string
	Value string
}

// Space Project space
type Space struct {
	ID      string  `json:"id"`
	Name    string   `json:"name"`
	Type    string   `json:"type"`
	URL     string   `json:"url"`
	Headers []Header `json:"headers"`
	Body    string   `json:"body"`
}

func CreateSpace(w http.ResponseWriter, r *http.Request) {
	var newSpace Space
	err := json.NewDecoder(r.Body).Decode(&newSpace)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	dataJSON, err := json.Marshal(newSpace)
	res := elasticsearch.IndexData(dataJSON, "space")
	json.NewEncoder(w).Encode(&res)

}

func GetSpace(w http.ResponseWriter, r *http.Request) {
	var Spaces Space
	params := mux.Vars(r)
	data := elasticsearch.Query{
		Key:   "id",
		Value: params["id"],
	}
	searchResult := elasticsearch.QueryData(data, "space")
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &Spaces)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}
	}
	json.NewEncoder(w).Encode(&Spaces)
}

func GetAllSpace(w http.ResponseWriter, r *http.Request) {
	var Spaces []Space
	var Space Space
	searchResult := elasticsearch.QueryAllData("space")
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &Space)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}
		Spaces = append(Spaces, Space)
	}
	json.NewEncoder(w).Encode(&Spaces)
}

func UpdateSpace(w http.ResponseWriter, r *http.Request) {
	var Space Space
	vars := mux.Vars(r)
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&Space); err != nil {
		fmt.Println("Invalid request payload", err)
		return
	}
	defer r.Body.Close()
	data := map[string]interface{}{"name": Space.Name}
	searchResult := elasticsearch.UpdateData(vars["id"], data, "space")
	json.NewEncoder(w).Encode(searchResult.Id)
}

func RunSpace(w http.ResponseWriter, r *http.Request) {
	tr = metrics.Tracer()
	var request = "GET"
	var url = "https://www.google.com"
	client := &http.Client{Transport: tr}

	switch request{
	case "GET":
		resp, err := client.Get(url)
		if err != nil {
			log.Fatalf("get error: %s: %s", err, url)
		}
		defer resp.Body.Close()
		output := ioutil.Discard
		io.Copy(output, resp.Body)
		break
	case "POST":
		break
	case "PUT":
		break
	case "DELETE":
		break
	case "OPTION":
		break
	default:
		print("Default")
	}

}