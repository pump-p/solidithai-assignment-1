import apiClient from './axiosInstance';

// Fetch all users
export const fetchAllUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching users:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// Fetch a user by ID
export const fetchUserById = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching user with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error(
      'Error creating user:',
      error.response?.data || error.message
    );
    throw error;
  }
};

// Update an existing user
export const updateUser = async (id, userData) => {
  try {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(
      `Error updating user with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error deleting user with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// User login
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data; // { token, user }
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
};

// User signup
export const signupUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data; // { token, user }
  } catch (error) {
    console.error('Error signing up:', error.response?.data || error.message);
    throw error;
  }
};

// User logout (optional, backend-based)
export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data; // { message: "User logged out successfully" }
  } catch (error) {
    console.error('Error logging out:', error.response?.data || error.message);
    throw error;
  }
};
