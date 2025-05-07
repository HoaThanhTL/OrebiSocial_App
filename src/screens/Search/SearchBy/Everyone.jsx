import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { imageUrlTest } from "../../../utils/testData";
import Spinner from "react-native-loading-spinner-overlay";
import ROUTES from "../../../constants/routes";
import { getSuggestionAccountByAccountId } from "../../../app/Account/actions";
import { useDispatch } from "react-redux";

const data = ["dongvancong", "truongtieunhi", "vuvanthong", "antdesign12"];

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

const Everyone = ({
  searchHistoryList,
  setSearchHistoryList,
  handleFocus,
  handleBlurWhenTouchEmpty,
  setSearchBy,
  accountResponse,
  accountList,
  loadingEveryone,
}) => {
  //   const [searchHistoryList, setSearchHistoryList] = useState([]);
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const navigateToFriend = (item) => {
    navigation.navigate(ROUTES.FRIENDS, { item });
  };
  const fetchAccountSuggestion = async (accountId) => {
    await dispatch(getSuggestionAccountByAccountId(accountId));
  };

  const Card = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => fetchAccountSuggestion(item?.accountId).then((res) => {
          navigateToFriend(item);
        })}
        style={{ marginHorizontal: 10, marginBottom: 10 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ height: 45, width: 45, borderRadius: 100 }}
            source={{
              uri: item?.user?.avatar || imageUrlTest,
            }}
          />
          <View style={{ flex: 1, marginLeft: 10, gap: 3 }}>
            <Text style={{ fontWeight: 700, color: "black" }}>
              {item?.firstname &&
                item?.lastname &&
                item?.firstname + " " + item?.lastname}
            </Text>
            <Text style={{ color: "grey" }}>
              {"@" + item?.username + " | " + `${item?.posts?.length} bài viết`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setSearchBy("Everyone");
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
  console.log(accountList);
  return (
    <TouchableWithoutFeedback onPress={handleBlurWhenTouchEmpty}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Spinner visible={loadingEveryone} />
        {accountList?.length === 0 ? (
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
          <View style={{ flex: 1, marginTop: 10 }}>
            <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  letterSpacing: 0.5,
                  fontWeight: 700,
                }}
              >
                Kết quả tìm kiếm
              </Text>
            </View>

            <FlatList
              data={accountList}
              renderItem={({ item }) => <Card item={item} />}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Everyone;

const styles = StyleSheet.create({});
