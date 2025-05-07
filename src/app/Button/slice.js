import { createSlice } from "@reduxjs/toolkit";
import { fetchFollowFriend } from "./action";

const followFriendSlice = createSlice({
    name: "followFriend",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(fetchFollowFriend.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFollowFriend.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchFollowFriend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default followFriendSlice.reducer;
