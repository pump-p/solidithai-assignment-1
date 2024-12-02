package middleware

import (
	"net/http"
	"strings"

	"github.com/pump-p/solidithai/crud-go/backend/utils"

	"github.com/labstack/echo/v4"
)

// AuthMiddleware validates the JWT token
func AuthMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Authorization token required"})
			}

			// Strip "Bearer " prefix
			token := strings.TrimPrefix(authHeader, "Bearer ")
			if token == authHeader {
				return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid token format"})
			}

			// Validate the token
			_, err := utils.ValidateJWT(token)
			if err != nil {
				return c.JSON(http.StatusUnauthorized, map[string]string{"error": "Invalid or expired token"})
			}

			return next(c)
		}
	}
}
