import axios from "axios";

const API_URL = "http://localhost:5000";

export const createPost = async (post, thunkAPI) => {
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

export const getRandomPosts = async (thunkAPI) => {
  const res = await fetch(API_URL + "/posts/random", {
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
  const res = await fetch(API_URL + "/posts/" + post.id, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stauts: post.stauts }),
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const getSingleUserPosts = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/posts/user/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const search = async (data, thunkAPI) => {
  const res = await fetch(API_URL + "/posts/search", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const searchAnonymously = async (data, thunkAPI) => {
  const res = await fetch(API_URL + "/posts/search/anonymously", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const deletePost = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/posts/" + id, {
    method: "DELETE",
    credentials: "include",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(data),
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
  getComments,
  updatePost,
  getSingleTag,
  getRandomPosts,
  getSingleUserPosts,
  search,
  deletePost,
  searchAnonymously,
};

export default postsService;
