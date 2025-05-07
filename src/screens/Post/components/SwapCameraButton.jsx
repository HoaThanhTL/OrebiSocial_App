import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SwapCameraButton = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}
    >
      <Ionicons name="md-camera-reverse-outline" size={28} color="white" />
    </TouchableOpacity>
  );
};

export default SwapCameraButton;

const styles = StyleSheet.create({});
