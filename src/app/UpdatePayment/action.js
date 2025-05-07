import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./../../../env";

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("ACCESS_TOKEN");
    return token;
  } catch (error) {
    console.error("Error getting authentication token:", error);
    throw error;
  }
};

export const fetchUpdatePayment = createAsyncThunk(
  "updatePayment/fetchUpdatePayment",
  async (rechargeId) => {
    try {
      const apiUrl = `${BASE_URL}/Invoice/${rechargeId}/UpdateInvoice`;
      console.log("API URL: ", apiUrl);

      const response = await axios.put(apiUrl);

      console.log("Response data payment", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in payment :", error);
      throw error;
    }
  }
);
