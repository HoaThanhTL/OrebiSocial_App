import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fetchDeleteComment = createAsyncThunk(
    "deleteComment/fetchDeleteComment",
    async (commentId, { getState }) => {
        try {
            const apiUrl = `/odata/Comment/DeleteComment/${commentId}`;
            console.log("API URL: ", apiUrl);
            const response = await axiosClient.delete(apiUrl);
            console.log("Response data comment", response.data);
            return commentId;
        } catch (error) {
            console.error("Error in deleteComment :", error);
            throw error;
        }
    }
);

