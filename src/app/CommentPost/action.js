import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fetchCommentPost = createAsyncThunk(
  "commentPost/fetchCommentPost",
  async (postId) => {
    try {
      console.log("Post id", postId);
      const apiUrl = `/odata/Comment/${postId}`;
      console.log("API URL: ", apiUrl);
      const response = await axiosClient.get(apiUrl);
      console.log("Respone data", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in commentPost :", error);
      throw error;
    }
  }
);
