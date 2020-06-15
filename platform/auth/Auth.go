package auth

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"net/http"
)

func GetAuthClient(w http.ResponseWriter, r *http.Request) {
	Type := r.URL.Query().Get("type")
	Code := r.URL.Query().Get("code")
	if Type != "" && Code != "" {
		fmt.Println("Auth Client Type and Code is undefined")
		return
	}
	switch Type {
	case "Goolge":
		GoogleCallback(w, r)
	case "Github":
		GithubCallback(w, r)
	case "Twtter":
		fmt.Println("Twitter")
	}
}

func GenerateToken(name string, email string) (string, error) {
	signingKey := []byte("keymaker")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"name":  name,
	})
	tokenString, err := token.SignedString(signingKey)
	return tokenString, err
}

func VerifyToken(tokenString string) bool {
	signingKey := []byte("keymaker")
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
	if err != nil || token == nil {
		return false
	}
	return true
}
