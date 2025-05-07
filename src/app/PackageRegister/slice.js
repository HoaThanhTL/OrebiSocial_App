import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fecthActivePost, fetchPurchasePackage } from "./action";

const packageRegisterSlice = createSlice({
  name: "activePost",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchasePackage.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchPurchasePackage.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(fetchPurchasePackage.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message;
      });
  },
});

export default packageRegisterSlice.reducer;
