package middleware

import (
	"fmt"
	"github.com/cloudlibz/raven/platform/auth"
	"net/http"
)

/*
 * RequireAuth() middleware validate the jwt token
 * @next a http/mux HandlerFunc
 */
func RequireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(res http.ResponseWriter, req *http.Request) {
		token := req.Header.Get("Authorization")
		if !auth.VerifyToken(token) {
			fmt.Fprint(res, "Unauthorized!,Invalid token")
			res.WriteHeader(http.StatusUnauthorized)
			return
		}
		next(res, req)
	}
}