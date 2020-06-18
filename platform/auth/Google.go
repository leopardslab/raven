package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/cloudlibz/raven/internal/user"
	"github.com/cloudlibz/raven/platform/config"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"net/http"
)

var googleOauthConfig *oauth2.Config

func init() {
	conf := config.New()
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  conf.Google.RedirectURL,
		ClientID:     conf.Google.ClientID,
		ClientSecret: conf.Google.ClientSecret,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile"},
		Endpoint:     google.Endpoint,
	}
}

func GoogleCallback(w http.ResponseWriter, r *http.Request) {

	token, err := googleOauthConfig.Exchange(context.Background(), r.URL.Query().Get("code"))
	if err != nil {
		fmt.Printf("Could not get token %s\n", err)
		return
	}

	// Obtain user information through token
	var userInfo map[string]interface{}
	if userInfo, err = getGoogleUserInfo(token); err != nil {
		fmt.Println("Failed to obtain user information, the error message is:", err)
		return
	}

	googleUser := &user.User{
		Id:       userInfo["id"].(string),
		Username: userInfo["email"].(string),
		Avatar:   userInfo["picture"].(string),
	}

	existingUser, err := user.GetUser(googleUser.Id)
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
	}
	if (existingUser == user.User{}) {
		user.CreateUser(googleUser)
	}

	if userInfo["token"], err = GenerateToken(googleUser.Id, googleUser.Username); err != nil {
		fmt.Println("An error couldn't generate token", err)
	}

	//  Return user information to the front end
	var userInfoBytes []byte
	if userInfoBytes, err = json.Marshal(userInfo); err != nil {
		fmt.Println("An error occurred when converting user information (map) to user information ([]byte), the error information is", err)
		return
	}

	w.Write(userInfoBytes)
}

// Get user information
func getGoogleUserInfo(token *oauth2.Token) (map[string]interface{}, error) {
	res, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		fmt.Printf("Cannot do get request %s\n", err.Error())
	}
	// Write the response data to userInfo and return
	var userInfo = make(map[string]interface{})
	if err = json.NewDecoder(res.Body).Decode(&userInfo); err != nil {
		return nil, err
	}

	return userInfo, nil
}
