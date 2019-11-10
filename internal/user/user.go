package user

// Service Contains user methods
type Service interface {
	CreateUser() (bool, error)
	UpdateUser() (bool, error)
	RemoveUser() (bool, error)
}

// User A user
type User struct {
	ID   int
	Name string
}

// CreateUser Creates a new user
func (user User) CreateUser() (bool, error) {
	return true, nil
}

// UpdateUser Updates existing user
func (user User) UpdateUser() (bool, error) {
	return true, nil
}

// RemoveUser Removes a user
func (user User) RemoveUser() (bool, error) {
	return true, nil
}
