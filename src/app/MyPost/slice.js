
import { createSlice } from "@reduxjs/toolkit";

import { fetchMyPost } from "./action";


const MyPostSlice = createSlice({
    name: "fetchMyPost",
    initialState: {
        posts: [],
        loadingMyPost: "idle",
        errorMyPost: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyPost.pending, (state) => {
                state.loadingMyPost = "pending";
            })
            .addCase(fetchMyPost.fulfilled, (state, action) => {
                state.loadingMyPost = "fulfilled";
                state.posts = action.payload;
            })
            .addCase(fetchMyPost.rejected, (state, action) => {
                state.loadingMyPost = "rejected";
                state.errorMyPost = action.error.message;
            });
    },
});
export default MyPostSlice.reducer;