import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchZaloPay } from "./action";

const zaloPaymentSlice = createSlice({
  name: "paymentZalo",
  initialState: {
    dataZaloPay: [],
    loadingZaloPay: "idle",
    errorZaloPay: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchZaloPay.pending, (state) => {
        state.loadingZaloPay = "pending";
      })
      .addCase(fetchZaloPay.fulfilled, (state, action) => {
        state.loadingZaloPay = "fulfilled";
        state.dataZaloPay = action.payload;
      })
      .addCase(fetchZaloPay.rejected, (state, action) => {
        state.loadingZaloPay = "rejected";
        state.errorZaloPay = action.error.message;
      });
  },
});

export default zaloPaymentSlice.reducer;
