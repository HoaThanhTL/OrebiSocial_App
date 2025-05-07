import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HistoryCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: "#e1e7ed",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{"@ " + item}</Text>
    </TouchableOpacity>
  );
};

const Fashion = ({
  searchHistoryList,
  setSearchHistoryList,
  setSearchBy,
  handleFocus,
  handleBlurWhenTouchEmpty,
}) => {
  useFocusEffect(
    useCallback(() => {
      const fetchData = () => {
        setSearchBy("Product");
      };

      fetchData();
      return () => {
        // Clean up (nếu cần thiết)
      };
    }, [])
  );

  // fetch first time
  useEffect(() => {
    const fetchSearchHistory = async () => {
      const existingArray = await AsyncStorage.getItem(
        "SEARCH_EVERYONE_HISTORY"
      );

      let newArray = [];

      if (existingArray !== null) {
        newArray = JSON.parse(existingArray);
      }
      setSearchHistoryList(newArray);
      console.log(newArray);
    };
    fetchSearchHistory();
  }, []);
  //   useEffect(() => {
  //     const fetchSearchHistory = async () => {
  //       const existingArray = await AsyncStorage.getItem(
  //         "SEARCH_EVERYONE_HISTORY"
  //       );

  //       let newArray = [];

  //       if (existingArray !== null) {
  //         newArray = JSON.parse(existingArray);
  //       }
  //       setSearchHistoryList(newArray);
  //       console.log(newArray);
  //     };
  //     setTimeout(() => {
  //       fetchSearchHistory();
  //     }, 10000);
  //   }, [searchHistoryList]);
  const removeSearchHistory = async () => {
    await AsyncStorage.removeItem("SEARCH_EVERYONE_HISTORY");
    setSearchHistoryList([]);
  };
  return (
    <TouchableWithoutFeedback onPress={handleBlurWhenTouchEmpty}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Spinner visible={false} />
        {true ? (
          <View style={{ flex: 1, marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 20,
                  letterSpacing: 0.5,
                  fontWeight: 700,
                }}
              >
                Lịch sử tìm kiếm
              </Text>
              <TouchableOpacity
                style={{ flex: 0 }}
                onPress={removeSearchHistory}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "grey",
                    textDecorationLine: "underline",
                  }}
                >
                  Xoá
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 15, marginHorizontal: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  gap: 8,
                }}
              >
                {searchHistoryList.map((item, index) => (
                  <HistoryCard
                    onPress={() => handleFocus(item)}
                    key={index}
                    item={item}
                  />
                ))}
              </View>
            </View>
          </View>
        ) : (
          <View />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Fashion;

const styles = StyleSheet.create({});
