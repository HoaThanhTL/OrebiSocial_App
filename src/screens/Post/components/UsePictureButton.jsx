import { StyleSheet, Text, TouchableOpacityProps, View } from "react-native";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const UsePictureButton = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 15,
        backgroundColor: "green",
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        Use picture
      </Text>
    </TouchableOpacity>
  );
};

export default UsePictureButton;

const styles = StyleSheet.create({});
