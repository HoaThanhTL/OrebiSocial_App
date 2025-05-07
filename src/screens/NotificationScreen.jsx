import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View } from "react-native";
import NotiTab from "../components/Noti/NotiTab";


const Tab = createMaterialTopTabNavigator();

const NotificationScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <NotiTab />
    </View>
  );
};

export default NotificationScreen;
