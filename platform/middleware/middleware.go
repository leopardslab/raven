package middleware

import (
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
			res.WriteHeader(http.StatusUnauthorized)
			return
		}
		next(res, req)
	}
}
