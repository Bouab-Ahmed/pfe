import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postsService';

const initialState = {
    posts: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
};

// create post

export const createPost = createAsyncThunk(
    'post/createPost',
    async(post, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user;
            return await postService.createPost(post, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);



export const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: {
        addCase: (builder) => {
            builder.addCase(createPost.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = '';
            });
            builder.addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message.push(action.payload);
            });
            builder.addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message.push(action.payload);
            });
        }
    },
});

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;