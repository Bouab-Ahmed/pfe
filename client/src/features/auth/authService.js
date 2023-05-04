import axios from "axios";

const API_URL = "http://localhost:5000";

// send otp

export const sendOtp = async (userData) => {
  console.log("sendOtp from authService", userData);
  const response = await axios.post(API_URL + "/auth/otp", userData);
  return response.data;
};

export const verify = async (token) => {
  const response = await fetch(API_URL + "/auth/verifyEmail", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });

  if (!response.ok) {
    throw new Error("verfiy your mail or password");
  }
  return await response.json();
};

// register user

export const register = async (userData) => {
  const response = await fetch(API_URL + "/auth/register", {
    method: "POST",
    credentials: "include",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    // body: JSON.stringify(userData),
    body: userData,
  });
  return await response.json();
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

// get current user

// export const getUserInformation = async () => {
//   const response = await fetch(API_URL + "/auth/user", {
//     method: "GET",
//     credentials: "include",
//   });
//   return await response.json();
// };

// logout user

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
