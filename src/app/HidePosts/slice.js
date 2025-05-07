import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hidePost } from "./action";

const hiddenPostSlice = createSlice({
    name: "hiddenPost",
    initialState: {
        dataHiddenPost: [],
        loadingHiddenPost: "idle",
        errorHiddenPost: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(hidePost.pending, (state) => {
                state.loadingHiddenPost = "pending";
            })
            .addCase(hidePost.fulfilled, (state, action) => {
                state.loadingHiddenPost = "fulfilled";
                // Update state accordingly if needed
            })
            .addCase(hidePost.rejected, (state, action) => {
                state.loadingHiddenPost = "rejected";
                state.errorHiddenPost = action.error.message;
            });
    },
});

export default hiddenPostSlice.reducer;
