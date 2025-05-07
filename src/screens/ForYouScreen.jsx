import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import CategoryForMen from "../components/Home/CategoryForMen";
import CategoryForWomen from "../components/Home/CategoryForWomen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import products from "../data/Products";
import Cart from "../components/Home/Cart";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";
const ForYouScreen = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    LogBox.ignoreLogs(["Could not find image file:///private/var/containers/Bundle/Application/C8E46929-4905-4D9D-8D77-7BA37ADDA8E8/Expo%20Go.app/abc.png"]);
  }, []);
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryButtonText, setCategoryButtonText] = useState("Tất cả");
  const navigation = useNavigation();

  const navigateToCartDetail = (item) => {

    navigation.navigate("CartDetail", { item });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity
        style={styles.categoryButton}
        onPress={() => setShowGenderOptions(!showGenderOptions)}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.categoryButtonText}>{categoryButtonText} </Text>
          <Icon name="chevron-down" size={30} color="black" />
        </View>
      </TouchableOpacity>

      {showGenderOptions && (
        <View style={styles.genderOptions}>
          <TouchableOpacity onPress={() => navigateToCategory("Nam")}>
            <Text style={styles.genderOptionText}>Nam</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToCategory("Nữ")}>
            <Text style={styles.genderOptionText}>Nữ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToCategory("Giới tính khác")}
          >
            <Text style={styles.genderOptionText}>Giới tính khác</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedCategory === "Nam" && <CategoryForMen />}
      {selectedCategory === "Nữ" && <CategoryForWomen />}

      <ScrollView

        // nestedScrollEnabled={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageScrollView}
        mt={10}
      >
        {products?.map((item) => (
          <View key={item.id} style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.hashtagText1}>{item.hashtag}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomHorizontalLine} />

      {/* Phần Bộ lọc và Sắp xếp */}
      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.buttonText}>Bộ lọc(19)</Text>
        </TouchableOpacity>
        <Icon name="tune" size={24} color="black" style={styles.icon} />
        <Text style={styles.separatorText}> | </Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.buttonText}>Sắp xếp</Text>
        </TouchableOpacity>
        <Icon name="sort" size={24} color="black" style={styles.icon} />
      </View>

      <View style={styles.bottomHorizontalLine} />

      {/* <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.postContainerScrollView}
            >
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
                        <Cart item={item} />
                    </TouchableOpacity>}
                    numColumns={2}
                />
            </ScrollView> */}
      <Cart />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    backgroundColor: "white",
    padding: 10,
    alignSelf: "center",

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
    height: 2,
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
    fontSize: 17,
  },
});

export default ForYouScreen;
