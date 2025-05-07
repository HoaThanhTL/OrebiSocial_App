import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDeleteComment } from "./action";

const deleteCommentSlice = createSlice({
    name: "deleteComment",
    initialState: {
        loadingDeleteComment: "idle",
        errorDeleteComment: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeleteComment.pending, (state) => {
                state.loadingDeleteComment = "pending";
            })
            .addCase(fetchDeleteComment.fulfilled, (state) => {
                state.loadingDeleteComment = "fulfilled";
            })
            .addCase(fetchDeleteComment.rejected, (state, action) => {
                state.loadingDeleteComment = "rejected";
                state.errorDeleteComment = action.error.message;
            });
    },
});

export default deleteCommentSlice.reducer;
