import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  singlePost: null,
  tags: [],
  isPostLoading: false,
  isPostSuccess: false,
  isPostError: false,
  isTagLoading: false,
  isTagSuccess: false,
  isTagError: false,
  message: "",
  singleTag: null,
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

export const getSingleTag = createAsyncThunk(
  "post/getSingleTag",
  async (id, thunkAPI) => {
    return postsService.getSingleTag(id, thunkAPI);
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
      state.isPostLoading = true;
      state.isPostError = false;
      state.isPostSuccess = false;
      state.message = "";
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.isPostLoading = false;
      state.isPostError = false;
      state.isPostSuccess = true;
      state.singlePost = action.payload.post;
    });
    builder.addCase(getSinglePost.rejected, (state) => {
      state.isPostLoading = false;
      state.isPostError = true;
      state.isPostSuccess = false;
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

    builder.addCase(getTags.pending, (state) => {
      state.isTagLoading = true;
      state.isTagError = false;
      state.isTagSuccess = false;
      state.message = "";
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.isTagLoading = false;
      state.isTagError = false;
      state.isTagSuccess = true;
      state.isPostSuccess = false;
      state.tags = [...action.payload.tag];
    });
    builder.addCase(getTags.rejected, (state, action) => {
      state.isTagLoading = false;
      state.isTagError = true;
      state.isTagSuccess = false;
    });

    builder.addCase(getSingleTag.pending, (state) => {
      state.isTagLoading = true;
      state.isTagError = false;
      state.isTagSuccess = false;
      state.message = "";
    }
    );
    builder.addCase(getSingleTag.fulfilled, (state, action) => {
      state.isTagLoading = false;
      state.isTagError = false;
      state.isTagSuccess = true;
      state.singleTag = action.payload.tag;
    }
    );
    builder.addCase(getSingleTag.rejected, (state, action) => {
      state.isTagLoading = false;
      state.isTagError = true;
      state.isTagSuccess = false;
    }
    );

  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
