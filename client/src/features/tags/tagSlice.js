import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tagService from "./tagService";

const initialState = {
    tags: [],
		tag: null,
    isTagError: false,
    isTagLoading: false,
    isTagSuccess: false,
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

// get single tag
export const getSingleTag = createAsyncThunk(
  "post/getSingleTag",
  async (id, thunkAPI) => {
    return tagService.getSingleTag(id, thunkAPI);
  }
);


// tag slice

export const tagsSlice = createSlice({
    name: "tag",
    initialState,
    reducers: {
        tagRest: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createTag.pending, (state) => {
            state.isTagLoading = true;
            state.isTagError = false;
            state.isTagSuccess = false;
            state.message = "";
        });
        builder.addCase(createTag.fulfilled, (state, { payload }) => {
            state.isTagLoading = false;
            state.isTagError = false;
            state.isTagSuccess = true;
            state.message = payload.msg;
        }
        );
        builder.addCase(getTags.pending, (state) => {
            state.isTagLoading = true;
            state.isTagError = false;
            state.isTagSuccess = false;
            state.tags = [];
        }
        );
        builder.addCase(getTags.fulfilled, (state, { payload }) => {
			console.log(payload)
            state.isTagLoading = false;
            state.isTagError = false;
            state.isTagSuccess = true;
            state.tags = [...payload.tag];
        }
        );
        builder.addCase(updateTag.pending, (state) => {
            state.isTagLoading = true;
            state.isTagError = false;
            state.isTagSuccess = false;
            state.message = "";
        }
        );
        builder.addCase(updateTag.fulfilled, (state, { payload }) => {
            state.isTagLoading = false;
            state.isTagError = false;
            state.isTagSuccess = true;
            state.message = payload.msg;
        }
        );
        builder.addCase(deleteTag.pending, (state) => {
            state.isTagLoading = true;
            state.isTagError = false;
            state.isTagSuccess = false;
            state.message = "";
        }
        );
        builder.addCase(deleteTag.fulfilled, (state, { payload }) => {
            state.isTagLoading = false;
            state.isTagError = false;
            state.isTagSuccess = true;
            state.message = payload.msg;
        }
        );
    },
});

export const { tagRest } = tagsSlice.actions;

export default tagsSlice.reducer;