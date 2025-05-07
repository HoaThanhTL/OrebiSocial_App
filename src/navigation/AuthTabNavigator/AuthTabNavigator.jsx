import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import Signup from "../../screens/Signup";
import Welcome from "../../screens/Welcome";
import MoreInfo from "../../screens/MoreInfo";
import WelcomeBack from "../../screens/WelcomeBack";
import ForgotPassword from "../../screens/ForgotPassword";

const Stack = createNativeStackNavigator();

const AuthTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"WelcomeBack"}
        component={WelcomeBack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Login"}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Signup"}
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"MoreInfo"}
        component={MoreInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"ForgotPassword"}
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthTabNavigator;

const styles = StyleSheet.create({});
