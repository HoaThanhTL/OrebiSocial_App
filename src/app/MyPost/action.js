import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fetchMyPost = createAsyncThunk(
  "MyPost/fetchMyPost",
  async (accountId) => {
    try {
      const apiUrl = `/odata/Posts/${accountId}/GetPostByAccountId`;
      const response = await axiosClient.get(apiUrl);
      console.log("apiUrl", apiUrl);
      return response.data?.posts;
    } catch (error) {
      throw error;
    }
  }
);
