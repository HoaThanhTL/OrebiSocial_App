// import { createSlice } from "@reduxjs/toolkit";
// import { fetchSavePost } from "./action";

// const saveSlice = createSlice({
//     name: "save",
//     initialState: {
//         loading: "idle",
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchSavePost.pending, (state) => {
//                 state.loading = "pending";
//                 state.error = null;
//             })
//             .addCase(fetchSavePost.fulfilled, (state) => {
//                 state.loading = "fulfilled";
//                 state.error = null;
//             })
//             .addCase(fetchSavePost.rejected, (state, action) => {
//                 state.loading = "rejected";
//                 state.error = action.error.message;
//             });
//     },
// });

// export default saveSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { savePost, unsavePost } from "./action";

const saveSlice = createSlice({
    name: "save",
    initialState: {
        savedPosts: [],
        saving: false,
        error: null,
    },
    reducers: {
        addSavedPost(state, action) {
            const postId = action.payload;
            state.savedPosts.push(postId);
        },
        removeSavedPost(state, action) {
            const postId = action.payload;
            state.savedPosts = state.savedPosts.filter(id => id !== postId);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(savePost.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(savePost.fulfilled, (state, action) => {
                state.saving = false;
                state.error = null;
                const postId = action.payload;
                state.savedPosts.push(postId);
            })
            .addCase(savePost.rejected, (state, action) => {
                state.saving = false;
                state.error = action.error.message;
            })
            .addCase(unsavePost.pending, (state) => {
                state.saving = true;
                state.error = null;
            })
            .addCase(unsavePost.fulfilled, (state, action) => {
                state.saving = false;
                state.error = null;
                const postId = action.payload;
                state.savedPosts = state.savedPosts.filter(id => id !== postId);
            })
            .addCase(unsavePost.rejected, (state, action) => {
                state.saving = false;
                state.error = action.error.message;
            });
    },
});

export const { addSavedPost, removeSavedPost } = saveSlice.actions;

export default saveSlice.reducer;
