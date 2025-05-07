import { createAsyncThunk } from "@reduxjs/toolkit";
import { accountService } from "../../services/accountService";

export const getAccountWithPostList = createAsyncThunk(
  "account/getAccountWithPostList",
  async (username, { rejectWithValue }) => {
    try {
      const response = await accountService.getAccountWithPostList(username);
      return response.data?.accounts;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const resetAccountWithPostList = createAsyncThunk(
  "account/resetAccountWithPostList",
  async (_, { rejectWithValue }) => {
    try {
      return [];
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getSuggestionAccount = createAsyncThunk(
  "account/getSuggestionAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountService.getSuggestionAccount();
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const followOneAccount = createAsyncThunk(
  "account/followOneAccount",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await accountService.followOneAccount(accountId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getSuggestionAccountByAccountId = createAsyncThunk(
  "account/getSuggestionAccountByAccountId",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await accountService.getSuggestionAccountByAccountId(
        accountId
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getFollowingAccountWithPosts = createAsyncThunk(
  "account/getFollowingAccountWithPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await accountService.getFollowingAccountWithPosts();
      // const responseINeed = response.data?.following?.flatMap((user) =>
      //   user?.posts?.map((post) => ({ ...post }))
      // );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const getFollowerAndFollowingByAccountId = createAsyncThunk(
  "account/getFollowerAndFollowingByAccountId",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await accountService.getFollowerAndFollowingByAccountId(
        accountId
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "account/updatePassword",
  async (data) => {
    try {
      const response = await accountService.updatePassword(data);
      console.log(data)
      return response.data;
    } catch (error) {
      console.log(error);
      // return rejectWithValue(error);
    }
  }
);
