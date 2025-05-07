import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAddCommentPost } from "./action";

const addCommentPostSlice = createSlice({
  name: "activePost",
  initialState: {
    dataAddCommentPost: [],
    loadingAddCommentPost: "idle",
    errorAddCommentPost: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddCommentPost.pending, (state) => {
        state.loadingAddCommentPost = "pending";
      })
      .addCase(fetchAddCommentPost.fulfilled, (state, action) => {
        state.loadingCommentPost = "fulfilled";
        state.loadingAddCommentPost = action.payload;
      })
      .addCase(fetchAddCommentPost.rejected, (state, action) => {
        state.loadingAddCommentPost = "rejected";
        state.errorAddCommentPost = action.error.message;
      });
  },
});

export default addCommentPostSlice.reducer;
