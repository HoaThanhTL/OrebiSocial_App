import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../services/productService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postService } from "../services/postService";

const initialState = {
  userInfo: null,
  accessToken: "",
  hashtagList: [],
  hashtagObject: null,
  hashtagListSearch: [],
  hashtagParam: "",
};
export const createnewpost = createAsyncThunk(
  "post/createnewpost",
  async ({ Content, Image, Hashtags }, { rejectWithValue }) => {
    try {
      const response = await postService.createnewpost({
        Content,
        Image,
        Hashtags,
      });
      console.log("<PostSlice>: " + response?.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ key, Content, Image, Hashtags }, { rejectWithValue }) => {
    try {
      const response = await postService.updatePost({
        key,
        Content,
        Image,
        Hashtags,
      });
      console.log("<PostSlice>: " + response?.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getDetailHashtag = createAsyncThunk(
  "post/getName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postService.getDetailHashtag();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const getHashtagById = createAsyncThunk(
  "post/getHashtagById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await postService.getHashtagById(id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const searchPostByHashtag = createAsyncThunk(
  "post/searchPostByHashtag",
  async (hashtag, { rejectWithValue }) => {
    try {
      const response = await postService.searchPostByHashtag(hashtag);
      return { hashTags: response.data?.hashTags, hashtag: hashtag };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const resetSearchPostByHashtag = createAsyncThunk(
  "post/resetSearchPostByHashtag",
  async (hashtag, { rejectWithValue }) => {
    try {
      return { hashTags: [], hashtag: hashtag };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createnewpost.pending, (state, action) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(createnewpost.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(createnewpost.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(getDetailHashtag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailHashtag.fulfilled, (state, action) => {
        state.hashtagList = action.payload;
        state.loading = false;
      })
      .addCase(getDetailHashtag.rejected, (state, action) => {
        state.loading = false;
      })
      //
      .addCase(getHashtagById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getHashtagById.fulfilled, (state, action) => {
        state.hashtagObject = action.payload.posts;
        state.loading = false;
      })
      .addCase(getHashtagById.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(searchPostByHashtag.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchPostByHashtag.fulfilled, (state, action) => {
        state.hashtagListSearch = action.payload.hashTags;
        state.hashtagParam = action.payload.hashtag;
        state.loading = false;
      })
      .addCase(searchPostByHashtag.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(resetSearchPostByHashtag.pending, (state, action) => {})
      .addCase(resetSearchPostByHashtag.fulfilled, (state, action) => {
        state.hashtagListSearch = action.payload.hashTags;
        state.hashtagParam = action.payload.hashtag;
      })
      .addCase(resetSearchPostByHashtag.rejected, (state, action) => {});
  },
});
export default postSlice.reducer;
