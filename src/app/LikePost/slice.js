import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchLikePost, fetchNumberLikeOfPost } from "./action";


const likePostSlice = createSlice({
  name: "likePost",
  initialState: {
    dataLikePost: [],
    numberLikeOfPost: 0,
    loading: false,
    loadingLikePost: "idle",
    errorLikePost: null,
  }, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikePost.pending, (state) => {
        state.loadingLikePost = "pending";
      })
      .addCase(fetchLikePost.fulfilled, (state, action) => {
        state.loadingLikePost = "fulfilled";
        state.dataLikePost = action.payload;
      })
      .addCase(fetchLikePost.rejected, (state, action) => {
        state.loadingLikePost = "rejected";
        state.errorLikePost = action.error.message;
      })
      .addCase(fetchNumberLikeOfPost.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchNumberLikeOfPost.fulfilled, (state, action) => {
        state.loading = false
        state.numberLikeOfPost = action.payload?.likes?.length;
      })
      .addCase(fetchNumberLikeOfPost.rejected, (state, action) => {
        state.loading = false
      });
  },
});

export default likePostSlice.reducer;
