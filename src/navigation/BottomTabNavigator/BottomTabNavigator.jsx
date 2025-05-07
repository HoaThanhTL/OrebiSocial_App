import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import PostScreen from "../../screens/PostScreen";
import { FontAwesome } from "@expo/vector-icons"; // Import the icons
import HomeNavigator from "./TabNavigator/HomeNavigator";
import ROUTES from "../../constants/routes";
import SearchNavigator from "./TabNavigator/SearchNavigator";
import PostNavigator from "./TabNavigator/PostNavigator";
import NotificationNavigator from "./TabNavigator/NotificationNavigator";
import ProfileNavigator from "./TabNavigator/ProfileNavigator";

const Stack = createBottomTabNavigator();
const BottomTabNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarIconStyle: {
          color: "red",
          backgroundColor: "red",
        },
        tabBarStyle: {
          backgroundColor: "#DBE9EC",
          height: Platform.OS === "android" ? 55 : 90,
        },
        tabBarActiveTintColor: "#1C6758",
        tabBarLabelStyle: {
          marginBottom: 5,
          fontSize: 12,
        },
      }}
    >
      <Stack.Screen
        name={ROUTES.HOME_NAVIGATOR}
        children={() => <HomeNavigator authenticated={authenticated} />}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="home" size={28} color={color} />;
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.SEARCH_NAVIGATOR}
        component={SearchNavigator}
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="search" size={size} color={color} />;
          },
        }}
      />

      <Stack.Screen
        name={ROUTES.POST_NAVIGATOR}
        children={() => <PostNavigator authenticated={authenticated} />}
        options={{
          headerShown: false,
          title: "Post",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="plus" size={28} color={color} />;
          },
        }}
      />

      <Stack.Screen
        name={ROUTES.NOTIFICATION_NAVIGATOR}
        component={NotificationNavigator}
        options={{
          headerShown: false,
          title: "Notification",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="bell" size={size} color={color} />;
          },
        }}
      />
      <Stack.Screen
        name={ROUTES.PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ size, color }) => {
            return <FontAwesome name="user" size={size} color={color} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
