package elasticsearch

import (
	"context"
	"fmt"
	"github.com/olivere/elastic/v7"
)
/*
 * GetESClient() initialize elaticsearch client instance
 * and return the client
 */
func GetESClient() *elastic.Client {

	client, err :=  elastic.NewClient(elastic.SetURL("http://localhost:9200"),
		elastic.SetSniff(false),
		elastic.SetHealthcheck(false))

	if err != nil {
		fmt.Println("Error initializing : ", err)
		panic("Client fail ")
	}

	fmt.Println("ES initialized...")

	return client

}

/*
 IndexData index the provided data and return index info
 @data byte array of data
 @Type type of struct
*/
func IndexData(data []byte,Type string) *elastic.IndexResponse {
	ctx := context.Background()
	esclient := GetESClient()
	js := string(data)
	ind, err := esclient.Index().
		Index(Type).
		BodyJson(js).
		Do(ctx)

	if err != nil {
		panic(err)
	}
	fmt.Println("Creation Successful")
	return ind
}

type Query struct{
	Key string
	Value string
}

/*
 QueryData retrieve index data
 @data
 @Type type of struct
*/
func QueryData(data Query,Type string) *elastic.SearchResult {
	ctx := context.Background()
	esclient := GetESClient()

	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.NewMatchQuery(data.Key, data.Value))
	searchService := esclient.Search().Index(Type).SearchSource(searchSource)
	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
	}

	return searchResult
}

/*
 QueryAllData() retrieve all indexed data
 @Type type of struct
*/
func QueryAllData(Type string) *elastic.SearchResult {
	ctx := context.Background()
	esclient := GetESClient()
	searchSource := elastic.NewSearchSource()
	searchSource.Query(elastic.MatchAllQuery{})
	searchService := esclient.Search().Index(Type).SearchSource(searchSource)
	searchResult, err := searchService.Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
	}
	return searchResult
}

/*
 UpdateData() update indexed data
 @id elasticsearch document id
 @data interface map of data
 @index the index name
*/
func UpdateData(id string,data interface{},index string) *elastic.UpdateResponse {
	ctx := context.Background()
	esclient := GetESClient()
	UpdateResponse, err := esclient.Update().Index(index).Id(id).Doc(data).Do(ctx)
	if err != nil {
		fmt.Println("[ProductsES][GetPIds]Error=", err)
	}
	return UpdateResponse
}