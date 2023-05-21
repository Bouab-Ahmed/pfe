const API_URL = "http://localhost:5000";

export const sendLike = async (id, thunkAPI) => {
  const res = await fetch(
    `${API_URL}/posts/${id}/like`,
    {
      method: "PUT",
      credentials: "include",
    }
  );

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

export const sendDislike = async (id, thunkAPI) => {
  const res = await fetch(API_URL + "/posts/" + id + "/dislike", {
    method: "PUT",
    credentials: "include",
  });

  if (!res.ok) {
    return thunkAPI.rejectWithValue(await res.json());
  }

  return await res.json();
};

const rateService = {
  sendLike,
  sendDislike,
};

export default rateService;
