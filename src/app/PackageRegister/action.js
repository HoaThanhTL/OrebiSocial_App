import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axiosClient";

export const fetchPurchasePackage = createAsyncThunk(
  "purchasePackage/fetchPurchasePackage",
  async (type) => {
    try {
      const apiUrl = `/odata/Puchare/PurcharePackage?PackageId=${type}`;

      const response = await axiosClient.post(apiUrl);
      console.log("Response data", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
