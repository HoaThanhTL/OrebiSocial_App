import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCommentPost } from "./action";

const commentPostSlice = createSlice({
  name: "activePost",
  initialState: {
    dataCommentPost: [],
    loadingCommentPost: "idle",
    errorCommentPost: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentPost.pending, (state) => {
        state.loadingCommentPost = "pending";
      })
      .addCase(fetchCommentPost.fulfilled, (state, action) => {
        state.loadingCommentPost = "fulfilled";
        state.dataCommentPost = action.payload;
      })
      .addCase(fetchCommentPost.rejected, (state, action) => {
        state.loadingCommentPost = "rejected";
        state.errorCommentPost = action.error.message;
      });
  },
});

export default commentPostSlice.reducer;
