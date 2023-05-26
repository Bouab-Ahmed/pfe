const API_URL = "http://localhost:5000";

export const getAllusers = async (thunkAPI) => {
  const res = await fetch(API_URL + "/user", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const getSingleUser = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/user/" + id, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const updateUser = async (user, thunkAPI) => {
  console.log(user)
  const res = await fetch(API_URL + "/user/updateUser/" + user._id, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const deleteUser = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/user/" + id, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const addFollow = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/user/follow/" + id, {
    method: "PUT",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const removeFollow = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/user/unfollow/" + id, {
    method: "PUT",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const getMe = async (thunkAPI) => {
  const res = await fetch(API_URL + "/user/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const activateUser = async (data, thunkAPI) => {
  const res = await fetch(API_URL + "/user/" + data.id, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accepted: data.accepted }),
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

const userService = {
  getAllusers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFollow,
  removeFollow,
  getMe,
  activateUser,
};

export default userService;
