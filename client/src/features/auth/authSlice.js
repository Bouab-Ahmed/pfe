import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";
// get user from local storage

const users = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  user: users ? users : null,
};

export const verifyMail = createAsyncThunk(
  "auth/verifyMail",
  async (token, thunkAPI) => {
    return authService.verify(token, thunkAPI);
  }
);

// register user

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, thunkAPI) => {
    return authService.register(user, thunkAPI);
  }
);

// login user

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    return authService.login(userData, thunkAPI);
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    return authService.logout(thunkAPI);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload.payload));
        state.message = payload.msg;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.msg;
        state.user = null;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        localStorage.setItem("user", JSON.stringify(payload.payload));
        state.user = payload.payload;
        toast.success(payload.msg);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload.msg;
        localStorage.removeItem("user");
        state.user = null;
      })

      .addCase(verifyMail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyMail.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload.msg;
      })
      .addCase(verifyMail.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = payload.msg;
        localStorage.removeItem("user");
      })

      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.user = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = payload.msg;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = authSlice.actions;

export const getUser = (state) => state.auth.user;

export default authSlice.reducer;
