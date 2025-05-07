import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const savePost = createAsyncThunk(
    "save/savePost",
    async (postId) => {
        try {
            const apiUrl = `/odata/Posts/${postId}/SaveCollectionByPostId`;
            const response = await axiosClient.post(apiUrl);
            console.log("apiUrl", apiUrl);
            return response.data?.posts;

        } catch (error) {
            throw error;
        }
    }
);

export const unsavePost = createAsyncThunk(
    "save/unsavePost",
    async (postId) => {
        try {
            const apiUrl = `/odata/Posts/${postId}/SaveCollectionByPostId`;
            const response = await axiosClient.post(apiUrl);
            return postId;
        } catch (error) {
            throw error;
        }
    }
);
