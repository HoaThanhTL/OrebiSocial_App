import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../../screens/HomeScreen";
import CartDetail from "../../../screens/CartDetail";
import ROUTES from "../../../constants/routes";
import MessagesScreen from "../../../screens/MessagesScreen";
import ConversationsScreen from "../../../screens/ConversationsScreen";
import SuggestionAccount from "../../../components/Home/SuggestionAccount";
import AuthTabNavigator from "../../AuthTabNavigator/AuthTabNavigator";
import Follower from "../../../components/Friends/Follower/Follower";
import Following from "../../../components/Friends/Following/Following";
const Stack = createNativeStackNavigator();
const HomeNavigator = ({ authenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.CONVERSATIONS}
        component={ConversationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.MESSAGESSCREEN}
        component={MessagesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SUGGESTION_ACCOUNT}
        component={SuggestionAccount}
        options={{ headerShown: false }}
      />
      {!authenticated && (
        <Stack.Screen
          name={"AUTH_NAVIGATOR"}
          component={AuthTabNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({});
