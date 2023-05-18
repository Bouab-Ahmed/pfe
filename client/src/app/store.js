import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/users/userSlice';
import commentReducer from '../features/comments/commentSlice';
import tagReducer from '../features/tags/tagSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postsReducer,
    user: userReducer,
    comment: commentReducer,
    tag: tagReducer,
  },
});
