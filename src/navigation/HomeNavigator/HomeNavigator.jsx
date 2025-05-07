import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "../BottomTabNavigator/BottomTabNavigator";
import CartDetail from "../../screens/CartDetail";
import ListLike from "../../components/Home/ListLike";
import FriendScreen from "../../screens/FriendScreen";
import SettingFriends from "../../screens/Friends/SettingFriends";
import ROUTES from "../../constants/routes";
import ReportPost from "../../screens/ReportPost";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadAuthState } from "../../features/userSlice";
import Login from "../../screens/Login";
import HomeFollowing from "../../components/Home/HomeFollowing";
import Signup from "../../screens/Signup";
import Following from "../../components/Friends/Following/Following";
import Follower from "../../components/Friends/Follower/Follower";
import PostDetail from "../../screens/PostDetail";
import HashtagDetail from "../../screens/Search/SearchBy/Hashtag/HastagDetail";

const Stack = createNativeStackNavigator();
const HomeNavigator = ({ authenticated }) => {
  // const [isAuth, setIsAuth] = useState(false);
  // const fetchData = async () => {
  //     // get Data
  // }
  // useEffect(() => {
  //     fetchData()
  //     console.log('Trang đầu tiên');
  // }, []);

  //   const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(loadAuthState());
  // }, [dispatch]);
  console.log(authenticated);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="nam"
        children={() => <BottomTabNavigator authenticated={authenticated} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTES.CARTDETAIL}
        component={CartDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.POST_DETAIL}
        component={PostDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.HASHTAG_DETAIL}
        component={HashtagDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.FRIENDS}
        component={FriendScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SETTINGFRIENDS}
        component={SettingFriends}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.LISTLIKE}
        component={ListLike}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.REPORTPOST}
        component={ReportPost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.FOLLOWER}
        component={Follower}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.FOLLOWING}
        component={Following}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AuthTabNavigator from './AuthTabNavigator';
// import BottomTabNavigator from './BottomTabNavigator/BottomTabNavigator';
// import Welcome from '../screens/Welcome';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Welcome" component={Welcome} />

//       <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;
