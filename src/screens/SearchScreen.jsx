import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Searchbar, IconButton } from "react-native-paper";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import CategoryForMen from "../components/Home/CategoryForMen";
import CategoryForWomen from "../components/Home/CategoryForWomen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import EveryoneScreen from "./Search/EveryoneScreen";
import FashionScreen from "./Search/FashionScreen";
import HashtagScreen from "./Search/HashtagScreen";
import ROUTES from "../constants/routes";
import Fashion from "./Search/SearchBy/Fashion";
import Product from "./Search/SearchBy/Product";
import Everyone from "./Search/SearchBy/Everyone";
import Hashtag from "./Search/SearchBy/Hashtag";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountWithPostList,
  resetAccountWithPostList,
} from "../app/Account/actions";
import {
  resetSearchPostByHashtag,
  searchPostByHashtag,
} from "../features/postSlice";
import { ScreenWidth } from "react-native-elements/dist/helpers";

const Tab = createMaterialTopTabNavigator();
const TAB_BAR_WIDTH = ScreenWidth - 50;
const TAB_BAR_INDICATOR = TAB_BAR_WIDTH / 2 - 100;

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchBy, setSearchBy] = useState(
    "Default" || "Fashion" || "Product" || "Everyone" || "Hashtag"
  );
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryButtonText, setCategoryButtonText] = useState("Tất cả");

  const navigation = useNavigation();

  const openGenderOptions = () => {
    setShowGenderOptions(true);
  };

  const closeGenderOptions = () => {
    setShowGenderOptions(false);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    closeGenderOptions();
  };

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  // Search logic
  const textInputRef = useRef(null);

  const handleBlur = () => {
    textInputRef.current.blur();
    setIsFocusSearchBar(false);
    setSearchBy("Default");
    setSearchQuery("");
  };
  const handleBlurWhenTouchEmpty = () => {
    textInputRef.current.blur();
  };
  const handleFocus = (key) => {
    textInputRef.current.focus();
    setSearchQuery(key);
  };

  const [isFocusSearchBar, setIsFocusSearchBar] = useState(false);

  // Search history logic
  const [searchHistoryList, setSearchHistoryList] = useState([]);
  const addKeySearchToHistory = async (keySearch) => {
    const existingArray = await AsyncStorage.getItem("SEARCH_EVERYONE_HISTORY");

    let newArray = [];

    if (existingArray !== null) {
      newArray = JSON.parse(existingArray);
    }

    if (
      !newArray.includes(keySearch) &&
      keySearch !== null &&
      keySearch !== ""
    ) {
      newArray.push(keySearch);
      console.log(newArray);
      setSearchHistoryList(newArray);
      await AsyncStorage.setItem(
        "SEARCH_EVERYONE_HISTORY",
        JSON.stringify(newArray)
      );
    }
  };

  // Fetch api
  const dispatch = useDispatch();

  // Search by Everyone
  const accountResponse = useSelector((state) => state.account.accountResponse);
  const accountList = useSelector((state) => state.account.accountList);
  const loadingEveryone = useSelector((state) => state.account.loading);
  const searchByUsername = async () => {
    await dispatch(getAccountWithPostList(searchQuery)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
    addKeySearchToHistory(searchQuery);
  };
  const resetSearchByUsername = async () => {
    await dispatch(resetAccountWithPostList(null)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };
  useEffect(() => {
    if (searchQuery === "" || searchQuery === null) {
      // Nếu không có tìm kiếm, load lại dữ liệu
      resetSearchByUsername();
      resetSearchByHashtag();
    }
    if (searchBy !== "Everyone") {
      resetSearchByUsername();
      resetSearchByHashtag();
    }
  }, [searchQuery]);

  // Search by Hashtag
  const searchByHashtag = async () => {
    await dispatch(searchPostByHashtag(searchQuery)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
      navigation.navigate(ROUTES.HASHTAG_RESULT);
    });
    addKeySearchToHistory(searchQuery);
  };
  const resetSearchByHashtag = async () => {
    await dispatch(resetSearchPostByHashtag(null)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={[
          style.Searchable,
          {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginHorizontal: 10,
          },
        ]}
      >
        <Searchbar
          ref={textInputRef}
          style={{ flex: 1 }}
          placeholder={
            searchBy !== "Default" ? `Search by ${searchBy}` : "Search"
          }
          onChangeText={setSearchQuery}
          onSubmitEditing={() => {
            switch (searchBy) {
              case "Fashion": {
                addKeySearchToHistory(searchQuery);
                break;
              }
              case "Product": {
                addKeySearchToHistory(searchQuery);
                break;
              }
              case "Everyone": {
                searchByUsername();
                break;
              }
              case "Hashtag": {
                searchByHashtag();
                break;
              }
              default:
                console.log("error");
            }
          }}
          value={searchQuery}
          onFocus={() => setIsFocusSearchBar(true)}
        //   onBlur={() => setIsFocusSearchBar(false)}
        />
        {isFocusSearchBar === true && (
          <TouchableOpacity onPress={handleBlur}>
            <Text>Huỷ</Text>
          </TouchableOpacity>
        )}
      </View>
      {isFocusSearchBar === true ? (
        <View style={{ flex: 1, marginTop: 5 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarIndicatorStyle: {
                backgroundColor: "black",
              },
            }}
          >
            <Tab.Screen
              name="byFashion"
              children={() => (
                <Fashion
                  searchHistoryList={searchHistoryList}
                  setSearchHistoryList={setSearchHistoryList}
                  setSearchBy={setSearchBy}
                  handleFocus={handleFocus}
                  handleBlurWhenTouchEmpty={handleBlurWhenTouchEmpty}
                />
              )}
              options={{
                tabBarLabel: "Trang phục",
                tabBarLabelStyle: { fontSize: 13, textTransform: "none" },
              }}
            />
            <Tab.Screen
              name="byProduct"
              children={() => (
                <Product
                  searchHistoryList={searchHistoryList}
                  setSearchHistoryList={setSearchHistoryList}
                  setSearchBy={setSearchBy}
                  handleFocus={handleFocus}
                  handleBlurWhenTouchEmpty={handleBlurWhenTouchEmpty}
                />
              )}
              options={{
                tabBarLabel: "Sản phẩm",
                tabBarLabelStyle: { fontSize: 13, textTransform: "none" },
              }}
            />
            <Tab.Screen
              name="byEveryone"
              children={() => (
                <Everyone
                  searchHistoryList={searchHistoryList}
                  setSearchHistoryList={setSearchHistoryList}
                  setSearchBy={setSearchBy}
                  handleFocus={handleFocus}
                  handleBlurWhenTouchEmpty={handleBlurWhenTouchEmpty}
                  accountResponse={accountResponse}
                  accountList={accountList}
                  loadingEveryone={loadingEveryone}
                />
              )}
              options={{
                tabBarLabel: "Mọi người",
                tabBarLabelStyle: { fontSize: 13, textTransform: "none" },
              }}
            />
            <Tab.Screen
              name="byHashtag"
              children={() => (
                <Hashtag
                  searchHistoryList={searchHistoryList}
                  setSearchHistoryList={setSearchHistoryList}
                  setSearchBy={setSearchBy}
                  handleFocus={handleFocus}
                  handleBlurWhenTouchEmpty={handleBlurWhenTouchEmpty}
                  accountResponse={accountResponse}
                />
              )}
              options={{
                tabBarLabel: "Hashtag",
                tabBarLabelStyle: { fontSize: 13, textTransform: "none" },
              }}
            />
          </Tab.Navigator>
        </View>
      ) : (
        <>
          <View style={style.textContainer}>
            {fontsLoaded && <Text style={style.text}>StyleGenz</Text>}
          </View>
          <View style={style.buttonContainer}>
            <Text style={{ fontSize: 30 }}>Xu hướng hàng đầu</Text>
            <IconButton
              icon="chat"
              color="#000"
              // onPress={() => console.log('Chat button pressed')}
              onPress={() => navigation.navigate(ROUTES.CONVERSATIONS)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={style.categoryButton}
              onPress={() => setShowGenderOptions(!showGenderOptions)}
            >
              <View style={style.rowContainer}>
                <Text style={style.categoryButtonText}>
                  {categoryButtonText}{" "}
                </Text>
                <Icon name="chevron-down" size={25} color="black" />
              </View>
            </TouchableOpacity>

            {showGenderOptions && (
              <View style={style.genderOptions}>
                <TouchableOpacity onPress={() => navigateToCategory("Nam")}>
                  <Text style={style.genderOptionText}>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigateToCategory("Nữ")}>
                  <Text style={style.genderOptionText}>Nữ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigateToCategory("Giới tính khác")}
                >
                  <Text style={style.genderOptionText}>Giới tính khác</Text>
                </TouchableOpacity>
              </View>
            )}

            {selectedCategory === "Nam" && <CategoryForMen />}
            {selectedCategory === "Nữ" && <CategoryForWomen />}

            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: "#1C6758",
                tabBarInactiveTintColor: "gray",
                tabBarIndicatorStyle: {
                  backgroundColor: "#1C6758",
                  height: 1.5,
                  width: TAB_BAR_INDICATOR,
                  left: (TAB_BAR_WIDTH / 3 - TAB_BAR_INDICATOR) / 2,
                },
                tabBarStyle: {
                  backgroundColor: "white",
                  width: TAB_BAR_WIDTH,
                  height: 40,
                  elevation: 0,
                  marginBottom: 10,
                  alignSelf: "center",
                },
                tabBarLabelStyle: { textTransform: "none", fontWeight: 500, fontSize: 15 },
                swipeEnabled: false,
              }}
            >
              <Tab.Screen name="Trang phục" component={FashionScreen} />
              <Tab.Screen name="Mọi người" component={EveryoneScreen} />
              <Tab.Screen name="Hashtag" component={HashtagScreen} />
            </Tab.Navigator>
          </View>
        </>
      )}

      {/* <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity
                        style={style.categoryButton}
                        onPress={() => setShowGenderOptions(!showGenderOptions)}
                    >
                        <View style={style.rowContainer}>
                            <Text style={style.categoryButtonText}>{categoryButtonText} </Text>
                            <Icon name="chevron-down" size={25} color="black" />
                        </View>
                    </TouchableOpacity>

                    {showGenderOptions && (
                        <View style={style.genderOptions}>
                            <TouchableOpacity onPress={() => navigateToCategory('Nam')}>
                                <Text style={style.genderOptionText}>Nam</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateToCategory('Nữ')}>
                                <Text style={style.genderOptionText}>Nữ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateToCategory('Giới tính khác')}>
                                <Text style={style.genderOptionText}>Giới tính khác</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={style.tabContainer}>
                    {selectedCategory === 'Nam' && <CategoryForMen />}
                    {selectedCategory === 'Nữ' && <CategoryForWomen />}

                    <Tab.Navigator>
                        <Tab.Screen name="Trang phục" component={FashionScreen} />
                        <Tab.Screen name="Mọi người" component={EveryoneScreen} />
                        <Tab.Screen name="Hashtag" component={HashtagScreen} />
                    </Tab.Navigator>
                </View>
            </View> */}
    </View>
  );
};
const style = StyleSheet.create({
  Searchable: {
    flexDirection: "row",
    marginTop: 40,
    elevation: 0,
    borderBottomWidth: 0,
  },
  textContainer: {
    backgroundColor: "#1C6758",
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  text: {
    fontFamily: "Pacifico_400Regular",
    fontSize: 55,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
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
    fontSize: 20,
    marginRight: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  genderOptions: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  genderOptionText: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  tabNavigator: {
    flex: 1,
  },
});
export default SearchScreen;
