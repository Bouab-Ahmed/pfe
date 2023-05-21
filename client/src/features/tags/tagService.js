const API_URL = "http://localhost:5000";

export const getTags = async (thunkAPI) => {
  const res = await fetch(API_URL + "/tag", {
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

export const createTag = async (tag, thunkAPI) => {
  const res = await fetch(API_URL + "/tag", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }
  return await res.json();
};

export const updateTag = async (tag, thunkAPI) => {
  const res = await fetch(API_URL + "/tag/" + tag._id, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const deleteTag = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/tag/" + id, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

const tagService = {
  getTags,
  getSingleTag,
  createTag,
  updateTag,
  deleteTag,
};

export default tagService;