import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMomoPay } from "./action";

const momoPaymentSlice = createSlice({
  name: "payment",
  initialState: {
    dataMomoPay: [],
    loadingMomoPay: "idle",
    errorMomoPay: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMomoPay.pending, (state) => {
        state.loadingMomoPay = "pending";
      })
      .addCase(fetchMomoPay.fulfilled, (state, action) => {
        state.loadingMomoPay = "fulfilled";
        state.dataMomoPay = action.payload;
      })
      .addCase(fetchMomoPay.rejected, (state, action) => {
        state.loadingMomoPay = "rejected";
        state.errorMomoPay = action.error.message;
      });
  },
});

export default momoPaymentSlice.reducer;
