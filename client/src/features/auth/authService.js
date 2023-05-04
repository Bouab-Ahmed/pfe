import axios from "axios";

const API_URL = "http://localhost:5000";

export const verify = async (token, thunkAPI) => {
  const res = await fetch(API_URL + "/auth/verifyEmail", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(token),
  });
  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }
  return await res.json();
};

// register user

export const register = async (userData, thunkAPI) => {
  const res = await fetch(API_URL + "/auth/register", {
    method: "POST",
    credentials: "include",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    // body: JSON.stringify(userData),
    body: userData,
  });
  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }
  return await res.json();
};

// login user

export const login = async (userData, thunkAPI) => {
  // const response = await axios.post(API_URL + "/auth/login", userData);
  const res = await fetch(API_URL + "/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const logout = async (thunkAPI) => {
  const res = await fetch(API_URL + "/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

const authService = {
  register,
  logout,
  login,
  verify,
};

export default authService;
