import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
