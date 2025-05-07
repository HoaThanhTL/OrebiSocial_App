import React from "react";
import { View, Image, StyleSheet } from "react-native";

const CartHomeFollowing = ({ item }) => (
  <View style={styles.postContainer}>
    <Image source={{ uri: item.image }} style={styles.postImage} />
    <View style={styles.postFooter}></View>
  </View>
);

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    overflow: "hidden",
    width: 100, // Đặt chiều rộng của mỗi item, tùy chỉnh theo ý muốn
  },
  postImage: {
    width: "100%",
    height: 150, // Đặt chiều cao của hình ảnh, tùy chỉnh theo ý muốn
    resizeMode: "cover",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginLeft: 5,
  },
});
export default CartHomeFollowing;
