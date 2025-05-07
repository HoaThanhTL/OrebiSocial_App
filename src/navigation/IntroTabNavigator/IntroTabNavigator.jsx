import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import Signup from "../../screens/Signup";
import Welcome from "../../screens/Welcome";
import Start from "../../screens/Start";
import LoginIntro from "../../screens/LoginIntro";
const Stack = createNativeStackNavigator();

const IntroTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Start"}
        component={Start}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Welcome"}
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"LoginIntro"}
        component={LoginIntro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Signup"}
        component={Signup}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default IntroTabNavigator;

const styles = StyleSheet.create({});
