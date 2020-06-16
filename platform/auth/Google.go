package auth

import (
	"context"
	"fmt"
	"github.com/cloudlibz/raven/platform/config"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"io/ioutil"
	"net/http"
)

var googleOauthConfig *oauth2.Config

func init() {
	conf := config.New()
	googleOauthConfig = &oauth2.Config{
		RedirectURL:  conf.Google.RedirectURL,
		ClientID:     conf.Google.ClientID,
		ClientSecret: conf.Google.ClientSecret,
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
}

func GoogleCallback(w http.ResponseWriter, r *http.Request) {

	token, err := googleOauthConfig.Exchange(context.Background(), r.URL.Query().Get("code"))
	if err != nil {
		fmt.Printf("Could not get token %s\n", err)
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
	w.Write(content)
}
