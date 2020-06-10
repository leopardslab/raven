package routes

import (
	"encoding/json"
	"fmt"
	"github.com/cloudlibz/raven/internal/space"
	"github.com/cloudlibz/raven/platform/elasticsearch"
	"github.com/gorilla/mux"
	"net/http"
)

func Route() * mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/", getWelcome).Methods("GET")
	r.HandleFunc("/metrics", getMetrics).Methods("GET") // GET /metrics
	r.HandleFunc("/space", createSpace).Methods("POST")
	r.HandleFunc("/spaces", getAllSpace).Methods("GET")
	r.HandleFunc("/space/{id}", getSpace).Methods("GET")
	r.HandleFunc("/space/{id}", updateSpace).Methods("PUT")
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


func createSpace(w http.ResponseWriter, r *http.Request) {
	var newSpace space.Space
	err := json.NewDecoder(r.Body).Decode(&newSpace)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	dataJSON, err := json.Marshal(newSpace)
	res := elasticsearch.IndexData(dataJSON,"space")
	json.NewEncoder(w).Encode(&res)

}

func getSpace(w http.ResponseWriter, r *http.Request) {
	var Spaces space.Space
	params := mux.Vars(r)
	data := elasticsearch.Query{
		Key: "id",
		Value: params["id"],
	}
	searchResult := elasticsearch.QueryData(data,"space")
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &Spaces)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}
	}
	json.NewEncoder(w).Encode(&Spaces)
}

func getAllSpace(w http.ResponseWriter, r *http.Request) {
	var Spaces[] space.Space
	var Space space.Space
	searchResult := elasticsearch.QueryAllData("space")
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &Space)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}
		Spaces = append(Spaces,Space)
	}
	json.NewEncoder(w).Encode(&Spaces)
}

func updateSpace(w http.ResponseWriter, r *http.Request) {
	var Space space.Space
	vars := mux.Vars(r)
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&Space); err != nil {
		fmt.Println("Invalid request payload", err)
		return
	}
	defer r.Body.Close()
	data := map[string]interface{}{"name": Space.Name}
	searchResult := elasticsearch.UpdateData(vars["id"],data,"space")
	json.NewEncoder(w).Encode(searchResult.Id)
}