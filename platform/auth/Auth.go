package auth

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"net/http"
	"os"
)

func GetAuthClient(w http.ResponseWriter, r *http.Request) {
	Type := r.URL.Query().Get("type")
	Code := r.URL.Query().Get("code")
	if Type == "" || Code == "" {
		fmt.Println("Auth Client Type and Code is undefined")
		return
	}
	switch Type {
	case "Goolge":
		GoogleCallback(w, r)
		break
	case "Github":
		GithubCallback(w, r)
		break
	case "Twtter":
		fmt.Println("Twitter")
		break
	default:
		panic("Invalid Oauth provider!")
	}

}

func GenerateToken(id string, name string) (string, error) {
	signingKey := []byte(os.Getenv("JWT_KEY"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":   id,
		"name": name,
	})
	tokenString, err := token.SignedString(signingKey)
	return tokenString, err
}

func VerifyToken(tokenString string) bool {
	signingKey := []byte(os.Getenv("JWT_KEY"))
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return signingKey, nil
	})
	if err != nil || token == nil {
		return false
	}
	return true
}
