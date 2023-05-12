
const API_URL = "http://localhost:5000";

export const createPost = async (post,thunkAPI) => {
  const res = await fetch(API_URL + "posts/newPost", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
    // body: post,
  });
  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }
  return await res.json();
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
