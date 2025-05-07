import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fetchAddCommentPost = createAsyncThunk(
  "addCommentPost/fetchAddCommentPost",
  async ({ postId, createAt, content }, { getState }) => {
    try {
      const apiUrl = `/odata/Comment/${postId}`;
      console.log("API URL: ", apiUrl);
      const response = await axiosClient.post(
        apiUrl,
        {
          createAt,
          content,
        }
      );
      console.log("Response data comment", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in addcommentPost :", error);
      throw error;
    }
  }
);
