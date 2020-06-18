package user

import (
	"encoding/json"
	"fmt"
	"github.com/cloudlibz/raven/platform/elasticsearch"
)

// Service Contains user methods
type Service interface {
	CreateUser() (bool, error)
	UpdateUser() (bool, error)
	RemoveUser() (bool, error)
}

// User A user
type User struct {
	Id       string
	Username string
	Avatar   string
}

// CreateUser Creates a new user
func CreateUser(newUser *User) (bool, error) {
	dataJSON, err := json.Marshal(newUser)
	if err != nil {
		return false, err
	}
	elasticsearch.IndexData(dataJSON, "user")
	return true, nil
}

// UpdateUser Updates existing user
func (user User) UpdateUser(id string) (bool, error) {
	return true, nil
}

// RemoveUser Removes a user
func (user User) RemoveUser() (bool, error) {
	return true, nil
}

// GetUser Retrieves a user
func GetUser(id string) (User, error) {
	var user User
	query := elasticsearch.Query{
		Key:   "Id",
		Value: id,
	}
	searchResult := elasticsearch.QueryData(query, "user")
	if searchResult == nil {
		return User{}, nil
	}
	for _, hit := range searchResult.Hits.Hits {
		err := json.Unmarshal(hit.Source, &user)
		if err != nil {
			fmt.Println("[Getting Students][Unmarshal] Err=", err)
			return User{}, err
		}
	}
	return user, nil
}
