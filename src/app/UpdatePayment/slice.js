import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMomoPay, fetchUpdatePayment } from "./action";

const updatePaymentSlice = createSlice({
  name: "updatePayment",
  initialState: {
    dataUpdatePayment: [],
    loadingUpdatePayment: "idle",
    errorUpdatePayment: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatePayment.pending, (state) => {
        state.loadingUpdatePayment = "pending";
      })
      .addCase(fetchUpdatePayment.fulfilled, (state, action) => {
        state.loadingUpdatePayment = "fulfilled";
        state.dataUpdatePayment = action.payload;
      })
      .addCase(fetchUpdatePayment.rejected, (state, action) => {
        state.loadingUpdatePayment = "rejected";
        state.errorUpdatePayment = action.error.message;
      });
  },
});

export default updatePaymentSlice.reducer;
