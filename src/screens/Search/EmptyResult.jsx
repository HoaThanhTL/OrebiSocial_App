import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "react-native-vector-icons";
const EmptyResult = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",}}>
      <Text style={{fontSize: 20, fontWeight: 700, color: "grey"}}>Không tìm thấy kết quả</Text>
      <Feather name="inbox" size={50}  color={"grey"} />
    </View>
  );
};

export default EmptyResult;

const styles = StyleSheet.create({});
