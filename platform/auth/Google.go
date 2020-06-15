package auth

import (
	"fmt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"io/ioutil"
	"net/http"
)

var (
	googleOauthConfig = &oauth2.Config{
		ClientID:     "403759859249-jmihasu0lfgasheptoau86pt62ntklf5.apps.googleusercontent.com",
		ClientSecret: "hmPhNly-KzXzcepA3RJ2FyD2",
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

	// TODO RANDOMIZE
	randomState = "random"
)

func GoogleCallback(w http.ResponseWriter, r *http.Request) {
	if r.FormValue("state") != randomState {
		fmt.Println("State is not valid")
		return
	}

	token, err := googleOauthConfig.Exchange(oauth2.NoContext, r.FormValue("code"))
	if err != nil {
		fmt.Printf("Could not get token %s\n", err.Error())
		return
	}

	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		fmt.Printf("Cannot do get request %s\n", err.Error())
		return
	}

	defer resp.Body.Close()

	content, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Cannot parse response %s\n", err.Error())
		return
	}

	fmt.Fprintf(w, "Response %s = ", content)
}
