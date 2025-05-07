import { StyleSheet, Text, TouchableOpacityProps, View } from 'react-native';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TakeAgainButton = (Props) => {
  const { ...otherProps } = Props;
  return (
    <TouchableOpacity
      {...otherProps}
      style={{
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 15,
        backgroundColor: 'red',
      }}
    >
      <Text
        style={{
          color: 'white',
        }}
      >
        Take again
      </Text>
    </TouchableOpacity>
  );
};

export default TakeAgainButton;

const styles = StyleSheet.create({});
