import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadAuthState } from "../features/userSlice";
import HomeNavigator from "../navigation/HomeNavigator/HomeNavigator";
import IntroTabNavigator from "./IntroTabNavigator/IntroTabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const authenticated = useAppSelector((state) => state.user.authenticated);
  const isExitIntro = useAppSelector((state) => state.user.isExitIntro);

  const fetchLoadAuthState = async () => {
    await dispatch(loadAuthState());
  };
  console.log("authenticated: ", authenticated);
  console.log("isExitIntro: ", isExitIntro);
  React.useEffect(() => {
    fetchLoadAuthState();
  }, []);

  const [firstLaunch, setFirstLaunch] = React.useState(null);
  React.useEffect(() => {
    async function setData() {
      await AsyncStorage.getItem("appLaunched").then(
        (value) => {
          if (value === "true") {
            setFirstLaunch(false);
          } else {
            setFirstLaunch(true);
          }
        }
      );
    }
    setData();
  }, []);
  return (
    firstLaunch !== null && (
      <Stack.Navigator>
        {firstLaunch && (
          <Stack.Screen
            name="first"
            component={IntroTabNavigator}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="tab"
          children={() => <HomeNavigator authenticated={authenticated} />}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    )
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
