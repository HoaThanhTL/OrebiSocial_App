import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fecthActivePost } from "./action";

const activePostSlice = createSlice({
  name: "activePost",
  initialState: {
    dataActivePost: [],
    loadingActivePost: "idle",
    errorActivePost: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthActivePost.pending, (state) => {
        state.loadingActivePost = "pending";
      })
      .addCase(fecthActivePost.fulfilled, (state, action) => {
        state.loadingActivePost = "fulfilled";
        state.dataActivePost = action.payload;
      })
      .addCase(fecthActivePost.rejected, (state, action) => {
        state.loadingActivePost = "rejected";
        state.errorActivePost = action.error.message;
      });
  },
});

export default activePostSlice.reducer;
