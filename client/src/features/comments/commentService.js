const API_URL = `http://localhost:5000`

export const createComment = async (comment, thunkAPI) => {
    const res = await fetch(API_URL + "/comment", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
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
}

export const updateComment = async (comment, thunkAPI) => {
    const res = await fetch(API_URL + "/comment/" + comment._id, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });

    if (!res.ok) {
        return thunkAPI.rejectWithValue(await res.json());
    }

    return await res.json();
}

export const deleteComment = async (id, thunkAPI) => {
    const res = await fetch(API_URL + "/comment/" + id, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) {
        return thunkAPI.rejectWithValue(await res.json());
    }

    return await res.json();
}

const commentService = {
    createComment,
    getComments,
    updateComment,
    deleteComment,
};

export default commentService;