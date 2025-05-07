import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { fecthListFollow, getProfile } from "../features/userSlice";
import ProfileLoggedIn from "../components/Profile/ProfileLoggedIn";
import ProfileNotLoggedIn from "../components/Profile/ProfileNotLoggedIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { RefreshControl, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const accountId = useSelector((state) => state.user.accountId);
  const profile = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const followersData = useSelector((state) => state.user.data);
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await dispatch(getProfile(accountId)).then((res) => {
          console.log(JSON.stringify(res, null, 2));
        });
      };
      const fecthFollow = async () => {
        try {
          console.log("truockhi fecthFollow", followersData);
          await dispatch(fecthListFollow());
        } catch (error) {
          console.error("Error in fecthFollow:", error);
        }
        console.log("saukhi fecthFollow:", followersData);
      };

      const fetchAsync = async () => {
        await fetchData();
        await fecthFollow();
      };

      fetchAsync();
    }, [accountId])
  );

  return (
    <>
      <Spinner visible={loading} />
      <ProfileLoggedIn profile={profile} followersData={followersData} />
    </>
  );
};

export default ProfileScreen;
