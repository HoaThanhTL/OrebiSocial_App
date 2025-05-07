import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fetchLikePost = createAsyncThunk(
  "likePost/fetchLikePost",
  async ({ postId }) => {
    try {
      const apiUrl = `/odata/Like(${postId})`;
      console.log("API URL: ", apiUrl);

      const response = await axiosClient.get(apiUrl);
      console.log("Like post successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);

export const fetchNumberLikeOfPost = createAsyncThunk(
  "likePost/fetchNumberLikeOfPost",
  async ({ postId }) => {
    try {
      const apiUrl = `/odata/Likes/GetAllAccountByLike/${postId}`;
      console.log("API URL: ", apiUrl);
      const response = await axiosClient.get(apiUrl);
      console.log("get number like of post successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
);
