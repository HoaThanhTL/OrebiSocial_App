import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const hidePost = createAsyncThunk(
    "activePost/hidePost",
    async (postId) => {
        try {
            const response = await axiosClient.put(`/odata/Posts/${postId}/BanPostByPostId`);
            console.log("Response data", response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
