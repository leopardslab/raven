package check

import (
	"encoding/json"
	"fmt"
	"github.com/cloudlibz/raven/internal/space"
	"github.com/cloudlibz/raven/platform/elasticsearch"
	"github.com/gorilla/mux"
	"net/http"
)

type Check struct {
	ID        string       `json:"id"`
	Name      string       `json:"name"`
	SpaceId   string       `json:"sid"`
	Type      string       `json:"type"`
	Data      []*space.Run `json:"data"`
	Period    string       `json:"period"`
	Running   bool         `json:"running"`
	CreatedAt string       `json:"createdAt"`
}



func CreateCheck(w http.ResponseWriter, r *http.Request) {
	var newCheck Check
	err := json.NewDecoder(r.Body).Decode(&newCheck)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	elasticId := space.GetSpaceElasticsearcId(newCheck.SpaceId)
	space.MakeSpaceCheck(elasticId)
	dataJSON, err := json.Marshal(newCheck)
	res := elasticsearch.IndexData(dataJSON, "check")
	json.NewEncoder(w).Encode(&res)
}

func GetCheck(w http.ResponseWriter, r *http.Request) {
	var Checks Check
	params := mux.Vars(r)
	data := elasticsearch.Query{
		Key:   "id",
		Value: params["id"],
	}
	searchResult := elasticsearch.QueryData(data, "check")
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &Checks)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}
	}
	json.NewEncoder(w).Encode(&Checks)
}

func GetAllChecks(w http.ResponseWriter, r *http.Request) {
	var Checks []Check
	var Check Check
	searchResult := elasticsearch.QueryAllData("check")
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &Check)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}
		Checks = append(Checks, Check)
	}
	json.NewEncoder(w).Encode(&Checks)
}

func UpdateCheck(w http.ResponseWriter, r *http.Request) {
	var Check Check
	vars := mux.Vars(r)
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&Check); err != nil {
		fmt.Println("Invalid request payload", err)
		return
	}
	defer r.Body.Close()
	data := map[string]interface{}{"name": Check.Name}
	searchResult := elasticsearch.UpdateData(vars["id"], data, "check")
	json.NewEncoder(w).Encode(searchResult.Id)
}

func StartCheck(w http.ResponseWriter, r *http.Request) {
	var Check Check
	params := mux.Vars(r)
	data := elasticsearch.Query{
		Key:   "id",
		Value: params["id"],
	}
	searchResult := elasticsearch.QueryData(data, "check")
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &Check)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}
	}

	space.GetSelectedSpace(Check.SpaceId)

}
