import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: [],
  isError: false,
  isLoadingComment: false,
  isSuccessComment: false,
  update: false,
  message: "",
};

// create comment
export const createComment = createAsyncThunk(
  "comment/createComment",
  async (comment, thunkAPI) => {
    return commentService.createComment(comment, thunkAPI);
  }
);

// get comments

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (id, thunkAPI) => {
    return commentService.getComments(id, thunkAPI);
  }
);

// update comment

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (comment, thunkAPI) => {
    return commentService.updateComment(comment, thunkAPI);
  }
);

// delete comment

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    return commentService.deleteComment(id, thunkAPI);
  }
);

// comment slice

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createComment.pending, (state) => {
      state.isLoadingComment = true;
      state.isError = false;
      state.isSuccessComment = false;
      state.update = false;

      state.message = "";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      console.log(action);
      state.isLoadingComment = false;
      state.isError = false;
      state.isSuccessComment = true;
      state.update = true;

      // state.message.push(action.payload.msg);
      // state.posts = [...action.payload.posts];
    });
    builder.addCase(createComment.rejected, (state, action) => {
      console.log(action);
      state.isLoadingComment = false;
      state.isError = true;
      state.isSuccessComment = false;
      state.update = false;

      // state.message.push(action.payload.msg);
    });
    builder.addCase(getComments.pending, (state) => {
      state.isLoadingComment = true;
      state.isError = false;
      state.isSuccessComment = false;
      state.message = "";
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.isLoadingComment = false;
      state.isError = false;
      state.isSuccessComment = true;
      state.comments = action.payload.comment;
      console.log(action.payload);
    });
    builder.addCase(getComments.rejected, (state) => {
      state.isLoadingComment = false;
      state.isError = true;
      state.isSuccessComment = false;
      // state.message = action.payload.msg;
    });
    builder.addCase(updateComment.pending, (state) => {
      state.isLoadingComment = true;
      state.isError = false;
      state.isSuccessComment = false;
      state.message = "";
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.isLoadingComment = false;
      state.isError = false;
      state.isSuccessComment = true;
      state.tags = [...action.payload.tag];
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.isLoadingComment = false;
      state.isError = true;
      state.isSuccessComment = false;
    });
    builder.addCase(deleteComment.pending, (state) => {
      state.isLoadingComment = true;
      state.isError = false;
      state.isSuccessComment = false;
      state.message = "";
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      console.log("fulfilled", action);
      state.isLoadingComment = false;
      state.isError = false;
      state.isSuccessComment = true;
      state.comments = [...action.payload.comment];
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      console.log("rejected", action);
      state.isLoadingComment = false;
      state.isError = true;
      state.isSuccessComment = false;
      // state.message = action.payload.msg;
    });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
