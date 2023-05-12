import axios from "axios";

const API_URL = "http://localhost:5000";

export const createPost = async (post, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const request = await axios.post(API_URL + "/newPost", post, config);
  return request.data;
};

export const getPosts = async (thunkAPI) => {
  const res = await fetch(API_URL + "/posts", {
    method: "GET",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }
  return await res.json();
};

export const getSinglePost = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/posts/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }
  return await res.json();
};

const postsService = {
  createPost,
  getPosts,
  getSinglePost,
};

export default postsService;
