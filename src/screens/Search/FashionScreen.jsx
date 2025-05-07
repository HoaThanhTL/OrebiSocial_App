import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import products from "../../data/Products";
import Cart from "../../components/Home/Cart";

const FashionScreen = () => {
  const navigation = useNavigation();

  const navigateToCartDetail = (item) => {
    // Chuyển đến màn hình CartDetail và truyền postId
    navigation.navigate("CartDetail", { item });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.postContainerScrollView}
      > */}
        <Cart />
      {/* </ScrollView> */}
    </View>
  );
};

export default FashionScreen;

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: "white",
    padding: 10,
    alignSelf: "center",
    // marginTop: 10,
    alignSelf: "flex-start",
  },
  categoryButtonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderOptions: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  genderOptionText: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  imageScrollView: {
    paddingHorizontal: 10,
  },
  imageContainer: {
    margin: 5,

    overflow: "hidden",
    bottom: 5,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "cover",
  },
  hashtagText1: {
    textAlign: "center",
    marginTop: 10,
    color: "black",
    fontSize: 15,
    marginBottom: 60,
  },
  bottomHorizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: "black",
    marginTop: 3,
  },

  filterSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 5,
  },

  filterButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },

  sortButton: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },

  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});
