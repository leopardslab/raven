package space

import (
	"encoding/json"
	"fmt"
	"github.com/cloudlibz/raven/platform/elasticsearch"
	"github.com/gorilla/mux"
	"net/http"
)

// Space Project space
type Space struct {
	ID   int32  `json:"id"`
	Name string `json:"name"`
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
