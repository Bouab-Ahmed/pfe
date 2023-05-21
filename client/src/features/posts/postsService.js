import axios from "axios";

const API_URL = "http://localhost:5000";

export const createPost = async (post,thunkAPI) => {
  const res = await fetch(API_URL + "/posts", {
    method: "POST",
    credentials: "include",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
    // body: JSON.stringify(post),
    body: post,
  });
  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }
  return await res.json();
};

export const getPosts = async (thunkAPI) => {
  const res = await fetch(API_URL + "/posts", {
    method: "GET",
    credentials: "include",
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

export const getComments = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/comment/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const getSingleTag = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/tag/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const updatePost = async (post, thunkAPI) => {
  console.log(post)
  const res = axios.put(API_URL + "/posts/" + post._id, post, {
    withCredentials: true,
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res;

};

const postsService = {
  createPost,
  getPosts,
  getSinglePost,
  getComments,
  updatePost,
  getSingleTag,
};

export default postsService;
