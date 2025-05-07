import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fecthListFollow = createAsyncThunk(
    "listfollow/fecthListFollow",
    async () => {
        try {
            const apiUrl = `/odata/UserProfile/Follow`;
            // const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
            // console.log('aaaaa', apiUrl);
            // const headers = {
            //     Authorization: `Bearer ${accessToken}`,
            // };


            const response = await axiosClient.get(apiUrl);

            console.log("Respone data", response.data);
            return response.data;

        } catch (error) {

            throw error;
        }
    }
);
