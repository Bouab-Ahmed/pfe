import axios from 'axios';

const API_URL = 'http://localhost:5000';

// register user

export const register = async (userData) => {
  const response = await axios.post(API_URL + '/auth/register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// login user

export const login = async (userData) => {
  const response = await axios.post(API_URL + '/auth/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
