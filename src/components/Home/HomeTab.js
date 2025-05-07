import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ForYouScreen from "../../screens/ForYouScreen";
import FollowingScreen from "../../screens/FollowingScreen";
import ROUTES from "../../constants/routes";
import { useNavigation } from "@react-navigation/native";
import { Icon, IconButton } from "react-native-paper";
import { ScreenWidth } from "react-native-elements/dist/helpers";

const Tab = createMaterialTopTabNavigator();
const TAB_BAR_WIDTH = ScreenWidth * (2 / 3);
const TAB_BAR_INDICATOR = TAB_BAR_WIDTH / 2 - 50;

const HomeTab = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, marginTop: 0 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarIndicatorStyle: {
            backgroundColor: "black",
            height: 2,
            width: TAB_BAR_INDICATOR,
            left: (TAB_BAR_WIDTH / 2 - TAB_BAR_INDICATOR) / 2,
          },
          tabBarStyle: {
            backgroundColor: "white",
            width: TAB_BAR_WIDTH,
            height: 40,
            elevation: 0,
            marginBottom: 10
          },
          tabBarLabelStyle: { textTransform: "none", fontWeight: "bold", fontSize: 15 },
          swipeEnabled: false,
        }}
      >
        <Tab.Screen name="Dành cho bạn" component={ForYouScreen} />
        <Tab.Screen name="Đang theo dõi" component={FollowingScreen} />
      </Tab.Navigator>
      <View
        style={{
          position: "absolute",
          paddingTop: 2,
          alignSelf: "flex-end",
          padding: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.CONVERSATIONS)}
        >
          <IconButton icon="chat" color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeTab;
