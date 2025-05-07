import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fetchFollowFriend = createAsyncThunk(
    "followFriend/fetchFollowFriend",
    async (userId, { getState }) => {
        try {

            const currentUserId = userId || getState().user.userId;

            const apiUrl = `/odata/Users/Follower`;
            console.log("API URL: ", apiUrl);


            const requestBody = {
                userId: currentUserId,

            };

            const response = await axiosClient.post(apiUrl, requestBody);
            console.log("Response data", response.data);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
