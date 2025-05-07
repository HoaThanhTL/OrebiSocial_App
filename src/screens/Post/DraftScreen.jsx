import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { ScreenWidth } from "./CameraScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ROUTES from "../../constants/routes";

const DraftScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToUpPostDraft = (item) => {
    navigation.navigate(ROUTES.UPPOSTDRAFT, { object: item });
  };

  const [draftData, setDraftData] = useState([]);

  const fetchAllDraftInStorage = async () => {
    try {
      const res = await AsyncStorage.getItem("DRAFT_ARRAY");
      let dataArray = [];
      if (res) {
        dataArray = JSON.parse(res);
      }
      setDraftData(dataArray);
      console.log("dataArray", JSON.stringify(dataArray, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  const removeDraftItem = async (item) => {
    try {
      const res = await AsyncStorage.getItem("DRAFT_ARRAY");
      let dataArray = [];

      if (res) {
        dataArray = JSON.parse(res);
      }

      dataArray = dataArray.filter((itemA) => itemA.id !== item?.id);
      await AsyncStorage.setItem("DRAFT_ARRAY", JSON.stringify(dataArray));
      setDraftData(dataArray);

      fetchAllDraftInStorage();
    } catch (error) {
      console.log(error);
    }
  };

  const removeAllDratf = async () => {
    try {
      await AsyncStorage.removeItem("DRAFT_ARRAY").finally(() => {
        fetchAllDraftInStorage();
      });
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllDraftInStorage();
    }, [])
  );

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => navigateToUpPostDraft(item)}
      style={[styles.itemContainer, { marginLeft: index % 2 === 0 ? 5 : 10 }]}
    >
      <Image source={{ uri: item?.selectedImage?.uri }} style={styles.image} />
      <TouchableOpacity
        onPress={() => removeDraftItem(item)}
        style={styles.deleteButton}
      >
        <AntDesign name="delete" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.hashtagContainer}>
            <Text style={styles.hashtag}>Bản nháp</Text>
          </View>
        </View>
        <Text
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: 10,
          }}
        >
          Tất cả các bản nháp sẽ bị xóa nếu bạn đăng xuất hoặc gỡ cài đặt ứng
          dụng.
        </Text>
      </View>
      <FlatList
        data={draftData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  hashtagContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hashtag: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemContainer: {
    marginBottom: 16,
  },
  image: {
    width: ScreenWidth / 2 - 10,
    aspectRatio: 1,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteButton: {
    position: "absolute",
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 7,
    top: 10,
    right: 10,
  },
});

export default DraftScreen;
