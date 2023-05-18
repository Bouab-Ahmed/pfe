import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tagService from "./tagService";

const initialState = {
    tags: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

// create tag
export const createTag = createAsyncThunk(
    "tag/createTag",
    async (tag, thunkAPI) => {
        return tagService.createTag(tag, thunkAPI);
    }
);

// get tags

export const getTags = createAsyncThunk(
    "tag/getTags",
    async (_, thunkAPI) => {
        return tagService.getTags(thunkAPI);
    }
);

// update tag

export const updateTag = createAsyncThunk(
    "tag/updateTag",
    async (tag, thunkAPI) => {
        return tagService.updateTag(tag, thunkAPI);
    }
);

// delete tag

export const deleteTag = createAsyncThunk(
    "tag/deleteTag",
    async (id, thunkAPI) => {
        return tagService.deleteTag(id, thunkAPI);
    }
);

// tag slice

export const tagsSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createTag.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        });
        builder.addCase(createTag.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = payload.msg;
        }
        );
        builder.addCase(getTags.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.tags = [];
        }
        );
        builder.addCase(getTags.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.tags = [...payload.tags];
        }
        );
        builder.addCase(updateTag.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
        );
        builder.addCase(updateTag.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = payload.msg;
        }
        );
        builder.addCase(deleteTag.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
        );
        builder.addCase(deleteTag.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = payload.msg;
        }
        );
    },
});

export const { reset } = tagsSlice.actions;

export default tagsSlice.reducer;