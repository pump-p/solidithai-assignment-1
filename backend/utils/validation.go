package utils

import "regexp"

// ValidateEmail checks if an email is in a valid format
func ValidateEmail(email string) bool {
	// Regex for a basic email validation
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	re := regexp.MustCompile(emailRegex)
	return re.MatchString(email)
}