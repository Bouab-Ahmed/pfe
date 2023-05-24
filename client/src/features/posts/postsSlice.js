import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  singlePost: null,
  tags: [],
  message: "",
  singleTag: null,

  isPostLoading: false,
  isPostSuccess: false,
  isPostError: false,
  singlePostLoading: false,
  singlePostSuccess: false,
  singlePostError: false,
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

// update post

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async (post, thunkAPI) => {
    console.log(post);
    return postsService.updatePost(post, thunkAPI);
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (id, thunkAPI) => {
    return postsService.deletePost(id, thunkAPI);
  }
);

// get random posts

export const getRandomPosts = createAsyncThunk(
  "posts/getRandomPosts",
  async (_, thunkAPI) => {
    return postsService.getRandomPosts(thunkAPI);
  }
);

// get single user posts

export const getSingleUserPosts = createAsyncThunk(
  "posts/getSingleUserPosts",
  async (id, thunkAPI) => {
    return postsService.getSingleUserPosts(id, thunkAPI);
  }
);

export const search = createAsyncThunk(
  "posts/search",
  async (data, thunkAPI) => {
    return postsService.search(data, thunkAPI);
  }
);

// posts slice
export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isPostLoading = true;
      state.isPostError = false;
      state.isPostSuccess = false;
      state.posts = [];
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = false;
      state.isPostSuccess = true;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = true;
      state.isPostSuccess = false;
      state.posts = [];
    });

    builder.addCase(createPost.pending, (state) => {
      state.isPostLoading = true;
      state.isPostError = false;
      state.isPostSuccess = false;
      state.message = "";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log(action);
      state.isPostLoading = false;
      state.isPostError = false;
      state.isPostSuccess = true;
    });
    builder.addCase(createPost.rejected, (state, action) => {
      console.log(action);
      state.isPostLoading = false;
      state.isPostError = true;
      state.isPostSuccess = false;
      // state.message.push(action.payload.msg);
    });

    builder.addCase(getSinglePost.pending, (state) => {
      state.singlePostSuccess = false;
      state.singlePostError = false;
      state.singlePostLoading = true;
      state.message = "";
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.singlePostLoading = false;
      state.singlePostError = false;
      state.singlePostSuccess = true;
      state.singlePost = action.payload.post;
    });
    builder.addCase(getSinglePost.rejected, (state) => {
      state.singlePostLoading = false;
      state.singlePostError = true;
      state.singlePostSuccess = false;
    });

    builder.addCase(updatePost.pending, (state) => {
      state.isPostLoading = true;
      state.isPostError = false;
      state.isPostSuccess = false;
      state.message = "";
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = false;
      state.isPostSuccess = true;
      state.singlePost = action.payload.post;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = true;
      state.isPostSuccess = false;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.isPostLoading = true;
      state.isPostError = false;
      state.isPostSuccess = false;
      state.message = "";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = false;
      state.isPostSuccess = true;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = true;
      state.isPostSuccess = false;
    });
    builder.addCase(getRandomPosts.pending, (state) => {
      state.isPostLoading = true;
      state.isPostError = false;
      state.isPostSuccess = false;
      state.posts = [];
    });
    builder.addCase(getRandomPosts.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = false;
      state.isPostSuccess = true;
      state.posts = action.payload.posts;
    });
    builder.addCase(getRandomPosts.rejected, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = true;
      state.isPostSuccess = false;
      state.posts = [];
    });

    builder.addCase(getSingleUserPosts.pending, (state) => {
      state.isPostLoading = true;
      state.isPostError = false;
      state.isPostSuccess = false;
      state.posts = [];
    });
    builder.addCase(getSingleUserPosts.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isPostLoading = false;
      state.isPostError = false;
      state.isPostSuccess = true;
      state.posts = action.payload;
    });
    builder.addCase(getSingleUserPosts.rejected, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = true;
      state.isPostSuccess = false;
      state.posts = [];
    });

    //search
    builder.addCase(search.pending, (state) => {
      state.isPostLoading = true;
      state.isPostError = false;
      state.isPostSuccess = false;
      state.posts = [];
    });
    builder.addCase(search.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isPostLoading = false;
      state.isPostError = false;
      state.isPostSuccess = true;
      state.posts = action.payload;
    });
    builder.addCase(search.rejected, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = true;
      state.isPostSuccess = false;
      state.posts = [];
    });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
