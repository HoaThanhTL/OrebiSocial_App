import { StyleSheet, Text, TouchableOpacityProps, View } from "react-native";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SavePitureButton = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 15,
        backgroundColor: "pink",
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        Save picture
      </Text>
    </TouchableOpacity>
  );
};

export default SavePitureButton;

const styles = StyleSheet.create({});
