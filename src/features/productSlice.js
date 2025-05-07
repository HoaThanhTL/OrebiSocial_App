import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../services/productService";

const initialState = {
  list: null,
};
export const getAllProduct = createAsyncThunk(
  "product/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getAllProduct();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state, action) => { })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => { });
  },
});
export default productSlice.reducer;
