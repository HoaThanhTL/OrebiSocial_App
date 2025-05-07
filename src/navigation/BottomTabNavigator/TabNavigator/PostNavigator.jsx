import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ROUTES from "../../../constants/routes";
import PostScreen from "../../../screens/PostScreen";
import UpPostScreen from "../../../screens/Post/UpPostScreen";
import NotificationScreen from "../../../screens/NotificationScreen";
import FollowingScreen from "../../../screens/FollowingScreen";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loadAuthState } from "../../../features/userSlice";
import AuthTabNavigator from "../../AuthTabNavigator/AuthTabNavigator";
import UpPostDraftScreen from "../../../screens/Post/UpPostDraftScreen";

const Stack = createNativeStackNavigator();
const PostNavigator = ({ authenticated }) => {
  return authenticated === true ? (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.POST}
        component={PostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.UPPOST}
        component={UpPostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.UPPOSTDRAFT}
        component={UpPostDraftScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATION}
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.FOLLOWING}
        component={FollowingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  ) : (
    <AuthTabNavigator />
  );
};

export default PostNavigator;

const styles = StyleSheet.create({});
