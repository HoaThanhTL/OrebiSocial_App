import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fecthActivePost = createAsyncThunk(
  "activePost/fetchActivePost",
  async () => {
    try {
      const apiUrl = `/odata/Posts/Active/Post`;
      const response = await axiosClient.get(apiUrl);
      console.log("Respone data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
