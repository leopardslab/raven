package auth

import (
	"encoding/json"
	"fmt"
	"github.com/cloudlibz/raven/internal/user"
	"github.com/cloudlibz/raven/platform/config"
	"net/http"
	"strconv"
)

type GitHub struct {
	id      string
	name    string
	picture string
	token   string
}

type Conf struct {
	ClientId     string // Client ID
	ClientSecret string // Client Secret
	RedirectUrl  string // Authorization callback URL
}

var conf Conf

type Token struct {
	AccessToken string `json:"access_token"`
	TokenType   string `json:"token_type"`
	Scope       string `json:"scope"`
}

func init() {
	Config := config.New()
	conf = Conf{
		ClientId:     Config.GitHub.ClientId,
		ClientSecret: Config.GitHub.ClientSecret,
		RedirectUrl:  Config.GitHub.RedirectUrl,
	}
}

// Authenticate and obtain user information
func GithubCallback(w http.ResponseWriter, r *http.Request) {

	var err error

	// Obtain code
	var code = r.URL.Query().Get("code")

	// Obtain token by code
	var tokenAuthUrl = getTokenAuthUrl(code)
	var token *Token
	if token, err = getToken(tokenAuthUrl); err != nil {
		fmt.Fprint(w, err)
		w.WriteHeader(http.StatusBadRequest)
	}

	// Obtain user information through token
	var userInfo map[string]interface{}
	if userInfo, err = getGithubUserInfo(token); err != nil {
		fmt.Fprint(w, "Failed to obtain user information, the error message is: ", err)
		w.WriteHeader(http.StatusBadRequest)
	}

	githubUser := &user.User{
		Id:       strconv.FormatFloat(userInfo["id"].(float64), 'E', -1, 64),
		Username: userInfo["name"].(string),
		Avatar:   userInfo["avatar_url"].(string),
	}

	existingUser, err := user.GetUser(githubUser.Id)
	if err != nil {
		w.WriteHeader(http.StatusBadGateway)
	}
	if (existingUser == user.User{}) {
		user.CreateUser(githubUser)
	}

	if userInfo["token"], err = GenerateToken(githubUser.Id, githubUser.Username, githubUser.Avatar); err != nil {
		fmt.Fprint(w, "An error couldn't generate token", err)
		w.WriteHeader(http.StatusBadGateway)
	}

	//  Return user information to the front end
	var userInfoBytes []byte
	if userInfoBytes, err = json.Marshal(userInfo); err != nil {
		fmt.Fprint(w, "An error occurred when converting user information (map) to user information ([]byte), the error information is", err)
		w.WriteHeader(http.StatusBadGateway)
	}
	w.Header().Set("Content-Type", "application/json")
	if _, err = w.Write(userInfoBytes); err != nil {
		fmt.Fprint(w, "An error occurred while returning user information ([]byte) to the front end. The error message is:", err)
		w.WriteHeader(http.StatusBadGateway)
	}

}

// Get token authentication url by code
func getTokenAuthUrl(code string) string {
	return fmt.Sprintf(
		"https://github.com/login/oauth/access_token?client_id=%s&client_secret=%s&code=%s",
		conf.ClientId, conf.ClientSecret, code,
	)
}

// Get token
func getToken(url string) (*Token, error) {

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
	return &token, nil
}

// Get user information
func getGithubUserInfo(token *Token) (map[string]interface{}, error) {

	// Make a request
	var userInfoUrl = "https://api.github.com/user" // github user information acquisition interface
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
