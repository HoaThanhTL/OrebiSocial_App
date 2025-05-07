import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fecthListFollow } from "./action";

const ListFollowSlice = createSlice({
  name: "listfollow",
  initialState: {
    data: [],
    loading: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthListFollow.pending, (state) => {
        state.loading = "pending";
        console.log("Pending state:", state);
      })
      .addCase(fecthListFollow.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        console.log("Fulfilled state:", state);
      })
      .addCase(fecthListFollow.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message || "An error occurred";
        console.log("Rejected state:", state.error);
      });
  },
});

export default ListFollowSlice.reducer;
