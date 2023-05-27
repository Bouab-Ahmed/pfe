import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rateService from "./rateService";
import { toast } from "react-toastify";

const initialState = {
  likes: 0,
  dislikes: 0,
  isRateError: false,
  isRateLoading: false,
  isRateSuccess: false,
  message: "",
};

// send like

export const sendLike = createAsyncThunk(
  "post/sendLike",
  async (id, thunkAPI) => {
    console.log(id);
    return rateService.sendLike(id, thunkAPI);
  }
);

// send unlike

export const sendDislike = createAsyncThunk(
  "post/sendDislike",
  async (id, thunkAPI) => {
    return rateService.sendDislike(id, thunkAPI);
  }
);

// rate slice

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(sendLike.pending, (state) => {
      state.isRateLoading = true;
      state.isRateError = false;
      state.isRateSuccess = false;
      state.message = "";
    });
    builder.addCase(sendLike.fulfilled, (state, action) => {
      state.isRateLoading = false;
      state.isRateError = false;
      state.isRateSuccess = true;
      state.dislikes = action.payload.dislikes;
      state.likes = action.payload.likes;
    });
    builder.addCase(sendLike.rejected, (state, action) => {
      console.log(action);
      state.isRateLoading = false;
      state.isRateError = true;
      state.isRateSuccess = false;
      toast.error(
        action.payload.msg === "authenticated invalid"
          ? "you must be logged in to rate a post"
          : "something went wrong"
      );
    });
    builder.addCase(sendDislike.pending, (state) => {
      state.isRateLoading = true;
      state.isRateError = false;
      state.isRateSuccess = false;
    });
    builder.addCase(sendDislike.fulfilled, (state, action) => {
      console.log(action);
      state.isRateLoading = false;
      state.isRateError = false;
      state.isRateSuccess = true;
      state.dislikes = action.payload.dislikes;
      state.likes = action.payload.likes;
    });
    builder.addCase(sendDislike.rejected, (state, action) => {
      state.isRateLoading = false;
      state.isRateError = true;
      state.isRateSuccess = false;
      toast.error(
        action.payload.msg === "authenticated invalid"
          ? "you must be logged in to rate a post"
          : "something went wrong"
      );
    });
  },
});

export default rateSlice.reducer;
// export const { reset } = rateSlice.actions;
