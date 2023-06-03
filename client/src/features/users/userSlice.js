import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  users: [],
  isUserLoading: false,
  isUserSuccess: false,
  isUserError: false,

  isSingleUserSuccess: false,
  isSingleUserError: false,
  isSingleUserLoading: false,
  isUserSuccessFollwing: false,
  isUserSuccessGetMe: false,
  isUserSuccessActive: false,

  isUserUpdateSuccess: false,
};

// get all users
export const getAllusers = createAsyncThunk(
  "users/getAllusers",
  async (_, thunkAPI) => {
    return userService.getAllusers(thunkAPI);
  }
);

// get single user

export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async (id, thunkAPI) => {
    return userService.getSingleUser(id, thunkAPI);
  }
);

// update user

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (user, thunkAPI) => {
    return userService.updateUser(user, thunkAPI);
  }
);

// delete user

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    return userService.deleteUser(id, thunkAPI);
  }
);

// add follow

export const addFollow = createAsyncThunk(
  "users/addFollow",
  async (id, thunkAPI) => {
    return userService.addFollow(id, thunkAPI);
  }
);

// remove follow

export const removeFollow = createAsyncThunk(
  "users/removeFollow",
  async (id, thunkAPI) => {
    return userService.removeFollow(id, thunkAPI);
  }
);

// get me

export const getMe = createAsyncThunk("users/getMe", async (_, thunkAPI) => {
  return userService.getMe(thunkAPI);
});

// add tag

export const addTag = createAsyncThunk(
  "users/addTag",
  async (tag, thunkAPI) => {
    return userService.addTag(tag, thunkAPI);
  }
);

// remove tag

export const removeTag = createAsyncThunk(
  "users/removeTag",
  async (tag, thunkAPI) => {
    return userService.removeTag(tag, thunkAPI);
  }
);

// get all users
export const activateUser = createAsyncThunk(
  "users/activated",
  async (data, thunkAPI) => {
    return userService.activateUser(data, thunkAPI);
  }
);

// follwing
export const following = createAsyncThunk(
  "users/following",
  async (id, thunkAPI) => {
    return userService.following(id, thunkAPI);
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
    builder.addCase(getAllusers.pending, (state) => {
      state.isUserLoading = true;
      state.isUserError = false;
      state.isUserSuccess = false;
      state.users = [];
    });
    builder.addCase(getAllusers.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = false;
      state.isUserSuccess = true;
      state.users = [...action.payload.user];
      // state.message.push(action.payload.msg);
      // state.posts = [...action.payload.posts];
    });
    builder.addCase(getAllusers.rejected, (state, action) => {
      console.log(action);
      state.isUserLoading = false;
      state.isUserError = true;
      state.isUserSuccess = false;
      state.users = [];
      // state.message.push(action.payload.msg);
    });
    builder.addCase(getSingleUser.pending, (state) => {
      state.isSingleUserLoading = true;
      state.isSingleUserError = false;
      state.isSingleUserSuccess = false;
      state.user = null;
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      state.isSingleUserLoading = false;
      state.isSingleUserError = false;
      state.isSingleUserSuccess = true;
      state.user = action.payload.user;
    });
    builder.addCase(getSingleUser.rejected, (state, action) => {
      state.isSingleUserLoading = false;
      state.isSingleUserError = true;
      state.isSingleUserSuccess = false;
      state.user = null;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.isUserLoading = true;
      state.isUserError = false;
      state.isUserSuccess = false;
      state.isUserUpdateSuccess = false;
      state.user = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action);
      state.isUserLoading = false;
      state.isUserError = false;
      state.isUserSuccess = true;
      state.isUserUpdateSuccess = true;
      // state.user = action.payload;
      // localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = true;
      state.isUserSuccess = false;
      state.isUserUpdateSuccess = false;
      state.user = null;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.isUserLoading = true;
      state.isUserError = false;
      state.isUserSuccess = false;
      state.user = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = false;
      state.isUserSuccess = true;
      state.user = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = true;
      state.isUserSuccess = false;
      state.user = null;
    });
    builder.addCase(addFollow.pending, (state) => {
      state.isUserLoading = true;
      state.isUserError = false;
      state.isUserSuccess = false;
      state.user = null;
    });
    builder.addCase(addFollow.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = false;
      state.isUserSuccess = true;
      state.user = action.payload.user;
    });
    builder.addCase(addFollow.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = true;
      state.isUserSuccess = false;
      state.user = null;
    });
    builder.addCase(removeFollow.pending, (state) => {
      state.isUserLoading = true;
      state.isUserError = false;
      state.isUserSuccess = false;
      state.user = null;
    });
    builder.addCase(removeFollow.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = false;
      state.isUserSuccess = true;
      state.user = action.payload.user;
    });
    builder.addCase(removeFollow.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = true;
      state.isUserSuccess = false;
      state.user = null;
    });
    builder.addCase(getMe.pending, (state) => {
      state.isUserLoading = true;
      state.isUserError = false;
      state.isUserSuccessGetMe = false;
      state.user = null;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = false;
      state.isUserSuccessGetMe = true;
      state.user = action.payload;
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = true;
      state.isUserSuccessGetMe = false;
      state.user = null;
    });
    ////active
    builder.addCase(activateUser.pending, (state) => {
      state.isUserSuccessActive = false;
    });
    builder.addCase(activateUser.fulfilled, (state, action) => {
      state.isUserSuccessActive = true;
    });
    builder.addCase(activateUser.rejected, (state, action) => {
      state.isUserSuccessActive = false;
    });
    //follwing
    builder.addCase(following.pending, (state) => {
      state.isUserSuccessFollwing = false;
    });
    builder.addCase(following.fulfilled, (state, action) => {
      state.isUserSuccessFollwing = true;
      state.user = action.payload;
    });
    builder.addCase(following.rejected, (state, action) => {
      state.isUserSuccessFollwing = false;
    });
    //add tag
    builder.addCase(addTag.pending, (state) => {
      state.isUserLoading = true;
      state.isUserError = false;
      state.isUserSuccess = false;
    });
    builder.addCase(addTag.fulfilled, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = false;
      state.isUserSuccess = true;
      state.user = action.payload;
      toast.success("tag added successfully");
    });
    builder.addCase(addTag.rejected, (state, action) => {
      state.isUserLoading = false;
      state.isUserError = true;
      state.isUserSuccess = false;
    });
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
