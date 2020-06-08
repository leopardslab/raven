package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Conf struct {
	ClientId     string // Client ID
	ClientSecret string // Client Secret
	RedirectUrl  string // Authorization callback URL
}

var conf = Conf{
	ClientId:     "6366e1b94de54e8a5610",
	ClientSecret: "03a3125f2c86070baf09c92914e50d1ce88611ea",
	RedirectUrl:  "http://localhost:3003/oauth/redirect",
}


type Token struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
}

// Authenticate and obtain user information
func Oauth(w http.ResponseWriter, r *http.Request) {

	var err error

	// Obtain code
	var code = r.URL.Query().Get("code")

	// Obtain token by code
	var tokenAuthUrl = GetTokenAuthUrl(code)
	var token *Token
	if token, err = GetToken(tokenAuthUrl); err != nil {
		fmt.Println(err)
		return
	}

	// Obtain user information through token
	var userInfo map[string]interface{}
	if userInfo, err = GetUserInfo(token); err != nil {
		fmt.Println("Failed to obtain user information, the error message is:", err)
		return
	}

	//  Return user information to the front end
	var userInfoBytes []byte
	if userInfoBytes, err = json.Marshal(userInfo); err != nil {
		fmt.Println("An error occurred when converting user information (map) to user information ([]byte), the error information is", err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	if _, err = w.Write(userInfoBytes); err != nil {
		fmt.Println("An error occurred while returning user information ([]byte) to the front end. The error message is:", err)
		return
	}

}

// Get token authentication url by code
func GetTokenAuthUrl(code string) string {
	return fmt.Sprintf(
		"https://github.com/login/oauth/access_token?client_id=%s&client_secret=%s&code=%s",
		conf.ClientId, conf.ClientSecret, code,
	)
}

// Get token
func GetToken(url string) (*Token, error) {

	// make a request
	var req *http.Request
	var err error
	if req, err = http.NewRequest(http.MethodGet, url, nil); err != nil {
		return nil, err
	}
	req.Header.Set("accept", "application/json")

	//Send a request and get a response
	var httpClient = http.Client{}
	var res *http.Response
	if res, err = httpClient.Do(req); err != nil {
		return nil, err
	}

	// Parse the response body into a token and return
	var token Token
	if err = json.NewDecoder(res.Body).Decode(&token); err != nil {
		return nil, err
	}
	fmt.Println(token)
	return &token, nil
}

// Get user information
func GetUserInfo(token *Token) (map[string]interface{}, error) {

	// Make a request
	var userInfoUrl = "https://api.github.com/user"	// github user information acquisition interface
	var req *http.Request
	var err error
	if req, err = http.NewRequest(http.MethodGet, userInfoUrl, nil); err != nil {
		return nil, err
	}
	req.Header.Set("accept", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("token %s", token.AccessToken))

	// Send request and get response
	var client = http.Client{}
	var res *http.Response
	if res, err = client.Do(req); err != nil {
		return nil, err
	}

	// Write the response data to userInfo and return
	var userInfo = make(map[string]interface{})
	if err = json.NewDecoder(res.Body).Decode(&userInfo); err != nil {
		return nil, err
	}
	return userInfo, nil
}


