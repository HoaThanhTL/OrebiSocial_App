import { StyleSheet, Text, TouchableOpacityProps, View } from "react-native";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ImageButton = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Ionicons name="images" size={28} color="white" />
    </TouchableOpacity>
  );
};

export default ImageButton;

const styles = StyleSheet.create({});
