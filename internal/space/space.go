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
)

type Header struct {
	ID    string
	Field string
	Value string
}

// Space Project space
type Space struct {
	ID      string   `json:"id"`
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
	var Spaces Space
	params := mux.Vars(r)
	result := elasticsearch.Query{
		Key:   "id",
		Value: params["id"],
	}
	searchResult := elasticsearch.QueryData(result, "space")
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &Spaces)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
		}
	}
	var request = Spaces.Type
	var url = Spaces.URL
	tr := metrics.Tracer()
	//var request = "POST"
	//var url = "https://www.google.com"
	//var url = "https://72874543-d10d-45e0-b36e-70dc307093e0.mock.pstmn.io/post"
	var data io.Reader
	var resp *http.Response
	client := &http.Client{Transport: tr}

	switch request {
	case "GET":
		resp, err := client.Get(url)
		if err != nil {
			log.Fatalf("get error: %s: %s", err, url)
		}
		defer resp.Body.Close()
		w.Write([]byte(fmt.Sprintf("%v", gatherMetrics(tr, resp))))

		break
	case "POST":
		print(url)
		req, err := http.NewRequest(http.MethodPost, url, data)
		if err != nil {
			log.Fatal(err)
		}
		resp, err = client.Do(req)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		w.Write([]byte(fmt.Sprintf("%v", gatherMetrics(tr, resp))))
		break
	case "PUT":
		req, err := http.NewRequest(http.MethodPut, url, data)
		if err != nil {
			log.Fatal(err)
		}
		resp, err = client.Do(req)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		w.Write([]byte(fmt.Sprintf("%v", gatherMetrics(tr, resp))))
		break
	case "DELETE":
		req, err := http.NewRequest(http.MethodDelete, url, data)
		if err != nil {
			log.Fatal(err)
		}
		resp, err = client.Do(req)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		w.Write([]byte(fmt.Sprintf("%v", gatherMetrics(tr, resp))))
		break
	case "OPTION":
		req, err := http.NewRequest(http.MethodOptions, url, data)
		if err != nil {
			log.Fatal(err)
		}
		resp, err = client.Do(req)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		w.Write([]byte(fmt.Sprintf("%v", gatherMetrics(tr, resp))))
		break
	case "HEAD":
		req, err := http.NewRequest(http.MethodHead, url, data)
		if err != nil {
			log.Fatal(err)
		}
		resp, err = client.Do(req)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		w.Write([]byte(fmt.Sprintf("%v", gatherMetrics(tr, resp))))
		break
	case "PATCH":
		req, err := http.NewRequest(http.MethodPatch, url, data)
		if err != nil {
			log.Fatal(err)
		}
		resp, err = client.Do(req)
		if err != nil {
			log.Fatal(err)
		}
		defer resp.Body.Close()
		w.Write([]byte(fmt.Sprintf("%v", gatherMetrics(tr, resp))))
		break
	default:
		resp, err := client.Get(url)
		if err != nil {
			log.Fatalf("get error: %s: %s", err, url)
		}
		defer resp.Body.Close()
		w.Write([]byte(fmt.Sprintf("%v", gatherMetrics(tr, resp))))

	}

}

func gatherMetrics(tr *metrics.Submetric, resp *http.Response) metrics.Metric {
	output := ioutil.Discard
	io.Copy(output, resp.Body)
	metrics := metrics.Metric{
		Duration:       tr.Duration(),
		ReponseTime:    tr.ReqDuration(),
		ConnectionTime: tr.ConnDuration(),
	}

	return metrics
}
