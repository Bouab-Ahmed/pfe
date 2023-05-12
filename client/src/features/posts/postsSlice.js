import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  singlePost: null,
  tags: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// create post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (post, thunkAPI) => {
    return postsService.createPost(post, thunkAPI);
  }
);

// get posts

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, thunkAPI) => {
    return postsService.getPosts(thunkAPI);
  }
);

export const getSinglePost = createAsyncThunk(
  "post/getSinglePost",
  async (id, thunkAPI) => {
    return postsService.getSinglePost(id, thunkAPI);
  }
);

// get tags

export const getTags = createAsyncThunk(
  "posts/getTags",
  async (_, thunkAPI) => {
    return postsService.getTags(thunkAPI);
  }
);

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      // state.message.push(action.payload.msg);
      // state.posts = [...action.payload.posts];
    });
    builder.addCase(createPost.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      // state.message.push(action.payload.msg);
    });
    builder.addCase(getSinglePost.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
      state.singlePost = action.payload.post;
    });
    builder.addCase(getSinglePost.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      // state.message = action.payload.msg;
    });
    builder.addCase(getTags.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    }
    );
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.tags = [...action.payload.tag];
    }
    );
    builder.addCase(getTags.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
    }
    );
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
