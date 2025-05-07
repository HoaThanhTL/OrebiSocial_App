import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "../services/productService";
import { userService } from "../services/userSevice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../services/axiosClient";
const initialState = {
  userInfo: null,
  profile: null,
  accessToken: "",
  data: [],
  authenticated: false,
  isExitIntro: false,
  loadingIntro: false,
  accountId: null,
  loading: false,
  error: null,
  email: null,
};
export const login = createAsyncThunk(
  "user/login",
  async ({ userName, passwordHash }, { rejectWithValue }) => {
    try {
      const response = await userService.login({ userName, passwordHash });
      console.log("<UserSlice>: " + response?.data);
      await AsyncStorage.setItem("ACCESS_TOKEN", response?.data?.accessToken);
      await AsyncStorage.setItem("EMAIL", response?.data?.email);
      await AsyncStorage.setItem(
        "ACCOUNT_ID",
        JSON.stringify(response?.data?.accountId)
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const loginGoogle = createAsyncThunk(
  "user/loginGoogle",
  async (token, { rejectWithValue }) => {
    try {
      const response = await userService.loginGoogle(token);
      console.log("<UserSlice>: " + response?.data);
      await AsyncStorage.setItem("ACCESS_TOKEN", response?.data?.data?.accessToken);
      await AsyncStorage.setItem("EMAIL", response?.data?.data?.email);
      await AsyncStorage.setItem(
        "ACCOUNT_ID",
        JSON.stringify(response?.data?.data?.accountId)
      );
      return response.data?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.removeItem("ACCESS_TOKEN");
      await AsyncStorage.removeItem("ACCOUNT_ID");
      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loadAuthState = createAsyncThunk(
  "user/loadAuthState",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      const accountId = await AsyncStorage.getItem("ACCOUNT_ID");
      if (accessToken && accountId) {
        return {
          authenticated: true,
          accountId: accountId,
        };
      }
      return {
        authenticated: false,
        accountId: null,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const setExitIntro = createAsyncThunk(
  "user/setExitIntro",
  async (_, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem("Intro", "ádljalsdlkajslkd");

      return true;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const checkExitIntro = createAsyncThunk(
  "user/checkExitIntro",
  async (_, { rejectWithValue }) => {
    try {
      const data = await AsyncStorage.getItem("Intro");
      if (data) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (key, { rejectWithValue }) => {
    try {
      // const response = await userService.getProfile(key);
      const response = await userService.getProfile(key);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

// export const updateProfile = createAsyncThunk(
//   "user/updateProfile",
//   async ({ key, City, Address, Height, Phone, Gender, Dob }, { rejectWithValue }) => {
//     try {
//       const response = await userService.updateProfile(key, City, Address, Height, Phone, Gender, Dob);
//       console.log("<UserSlice - updateProfile>: " + response?.data);

//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response?.data);
//     }
//   }
// );
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (
    { key, City, Address, Height, Phone, Gender, Dob, Avatar },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await userService.updateProfile(
        key,
        City,
        Address,
        Height,
        Phone,
        Gender,
        Dob,
        Avatar
      );
      console.log("<UserSlice - updateProfile>: " + response?.data);

      // After successfully updating, dispatch getProfile to fetch the updated profile
      // Make sure to pass the correct key, which should be the accountId or the identifier needed
      console.log("Before dispatching getProfile");
      await dispatch(getProfile(key));
      console.log("After dispatching getProfile");

      return response.data;
    } catch (error) {
      console.error("Error in updateProfile:", error);

      if (error.response?.status === 400) {
        // Handle validation errors
        return rejectWithValue(error.response?.data.errors);
      } else {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

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
      console.log("errror");
      throw error;
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await userService.resetPassword(email);
      console.log(email);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.authenticated = true;
        state.accountId = action.payload.accountId; // Assuming accountId is a property in the user data
        // Save userInfo to AsyncStorage
        // AsyncStorage.setItem("USER_INFO", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(loginGoogle.pending, (state, action) => {
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
        state.authenticated = true;
        state.accountId = action.payload.accountId; // Assuming accountId is a property in the user data
        // Save userInfo to AsyncStorage
        // AsyncStorage.setItem("USER_INFO", JSON.stringify(action.payload));
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.loading = false;
        state.authenticated = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userInfo = null;
        state.profile = null;
        state.loading = false;
        state.data = null;
        state.authenticated = false;
        state.accountId = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loadAuthState.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.authenticated = action.payload.authenticated;
        state.accountId = action.payload.accountId;
        state.userInfo = action.payload;
        // Load userInfo from AsyncStorage
        // const userInfoFromStorage = AsyncStorage.getItem("USER_INFO");
        // if (userInfoFromStorage) {
        //   state.userInfo = JSON.parse(userInfoFromStorage);
        // }
      })
      .addCase(loadAuthState.rejected, (state, action) => {
        state.loading = true;
      })

      .addCase(setExitIntro.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setExitIntro.fulfilled, (state, action) => {
        state.loading = false;
        state.isExitIntro = action.payload;
      })
      .addCase(setExitIntro.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(checkExitIntro.pending, (state, action) => {
        state.loadingIntro = true;
      })
      .addCase(checkExitIntro.fulfilled, (state, action) => {
        state.loadingIntro = false;
        state.isExitIntro = action.payload;
      })
      .addCase(checkExitIntro.rejected, (state, action) => {
        state.loadingIntro = false;
      })
      .addCase(getProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        // state.userInfo = action.payload;
        // state.accountId = action.payload.accountId;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.profile = action.payload;
        state.loading = false;

        console.log("Cập nhật thông tin người dùng thành công");

        // Save userInfo to AsyncStorage
        AsyncStorage.setItem("PROFILE", JSON.stringify(action.payload));
      })
      // .addCase(updateProfile.fulfilled, async (state, action) => {
      //   try {
      //     if (action.payload) {
      //       // Return a new state object
      //       return {
      //         ...state,
      //         userInfo: action.payload,
      //         profile: action.payload,
      //         loading: false,
      //         accountId: action.payload.accountId,
      //       };
      //     }
      //   } catch (error) {
      //     console.error("Error updating profile:", error);
      //   }
      // })
      // .addCase(updateProfile.fulfilled, (state, action) => {
      //   if (action.payload && action.payload.data) {
      //     // Assuming that the data structure is nested under 'data' property
      //     const updatedProfileData = action.payload.data;

      //     // Update the state to indicate that the profile has been updated
      //     state.userInfo = updatedProfileData;
      //     state.profile = updatedProfileData;
      //     state.loading = false;
      //     state.accountId = updatedProfileData.accountId;
      //     state.userProfile = action.payload;
      //   } else {
      //     console.error('Invalid or missing payload structure:', action.payload);
      //   }
      // })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;

        // Check if action has an error property before accessing its message
        state.error = action.error ? action.error.message : "Unknown error";
      })
      .addCase(fecthListFollow.pending, (state) => {
        state.loading = "pending";
        console.log("Pending state:", state);
      })
      .addCase(fecthListFollow.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
        console.log("Fulfilled state:", state);
      })
      .addCase(fecthListFollow.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.error.message || "An error occurred";
        console.log("Rejected state:", state.error);
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export default userSlice.reducer;
