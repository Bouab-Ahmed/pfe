import axios from "axios";

const API_URL = "http://localhost:5000";

// send otp

export const sendOtp = async (userData) => {
  console.log("sendOtp from authService", userData);
  const response = await axios.post(API_URL + "/auth/otp", userData);
  return response.data;
};

export const verify = async (userData) => {
  console.log("verifyEmail", userData);
  const response = await axios.post(API_URL + "/auth/verifyEmail", userData);
  return response.data;
};

// register user

export const register = async (userData) => {
  const response = await axios.post(API_URL + "/auth/register", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login user

export const login = async (userData) => {
  // const response = await axios.post(API_URL + "/auth/login", userData);
  const response = await fetch(API_URL + "/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

export const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  sendOtp,
  verify,
};

export default authService;
