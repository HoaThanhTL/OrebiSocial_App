import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import CartHomeFollowing from "./CartHomeFollowing";
import images from "../../data/Image";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card, Icon, Badge } from "react-native-paper";
import { Avatar, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  followOneAccount,
  getFollowingAccountWithPosts,
  getSuggestionAccount,
  getSuggestionAccountByAccountId,
} from "../../app/Account/actions";
import { imageUrlTest } from "../../utils/testData";
import ROUTES from "../../constants/routes";

const EveryOneSearch = () => {
  const navigation = useNavigation();
  const navigateToCartDetail = (item) => {
    navigation.navigate("CartDetail", { item });
  };
  const navigateToFriend = (item) => {
    navigation.navigate(ROUTES.FRIENDS, { item });
  };
  const navigateToSuggestionAccount = () => {
    navigation.navigate(ROUTES.SUGGESTION_ACCOUNT);
  };

  // ** API
  const dispatch = useDispatch();
  const accountSuggestionList = useSelector(
    (state) => state.account.accountSuggestionList
  );
  const accountFollowingList = useSelector(
    (state) => state.account.accountFollowingList
  );
  const authenticated = useSelector((state) => state.user.authenticated);

  // ** React hooks state
  const [isFollowed, setIsFollowed] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  function findFirstFollow(arr) {
    if (typeof arr !== "undefined" && Array.isArray(arr)) {
      if (arr.find((item) => item.isfollow === true)) {
        return true;
      }
      return false;
    }
  }

  useEffect(() => {
    const fetch = async () => {
      await fetchAllAccountSuggestionForCheck();
      await fetchAllFetFollowingAccountWithPosts();
    };
    fetch();
  }, []);

  // Dispatch functions
  const followOneAccountById = async (accountId) => {
    try {
      await dispatch(followOneAccount(accountId)).then(async (res) => {
        console.log("res", JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === "fulfilled") {
          await fetchAllAccountSuggestion();
        }
      });
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllAccountSuggestion();
    }, [])
  );

  const fetchAllAccountSuggestion = async () => {
    await dispatch(getSuggestionAccount());
  };

  const fetchAccountSuggestion = async (accountId) => {
    if (authenticated) {
      await dispatch(getSuggestionAccountByAccountId(accountId)).then((res) => {
        console.log("res", JSON.stringify(res, null, 2));
      });
      return true;
    } else {
      Alert.alert(
        "Thông báo",
        "Vui lòng đăng nhập để xem thông tin cá nhân của người khác!"
      );
      return false;
    }
  };

  const fetchAllAccountSuggestionForCheck = async () => {
    await dispatch(getSuggestionAccount()).then((res) => {
      const isFollowed = findFirstFollow(res.payload ?? []);
      setIsFollowed(isFollowed);
    });
  };

  const fetchAllFetFollowingAccountWithPosts = async () => {
    await dispatch(getFollowingAccountWithPosts()).then((res) => {
      console.log("res", JSON.stringify(res, null, 2));
    });
  };

  // Components
  const HeaderComponent = () => (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "regular",
            color: "#9D9FB7",
            marginTop: 10,
          }}
        >
          Khi những người bạn đang theo dõi chia sẻ trang phục của họ, bạn sẽ
          thấy những bộ trang phục ấy ở đây.
        </Text>
      </View>
    </>
  );
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          fetchAccountSuggestion(item?.accountId).then((res) => {
            if (res) {
              navigateToFriend(item);
            }
          })
        }
        style={{ marginTop: 5, marginHorizontal: 15, marginBottom: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Avatar
            activeOpacity={0.2}
            containerStyle={{
              width: 40,
              height: 40,
              backgroundColor: "#BDBDBD",
            }}
            onPress={() => {
              fetchAccountSuggestion(item?.accountId).then((res) => {
                if (res) {
                  navigateToFriend(item);
                }
              });
            }}
            rounded
            size="medium"
            source={{
              uri: item?.user?.avatar || imageUrlTest,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 13 }}>
              {item?.username || "user"}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#9D9FB7", fontSize: 12 }}>
                {item?.user?.height + " cm" || "0 cm"}
              </Text>
              <Text style={{ color: "#9D9FB7", fontSize: 12 }}> | </Text>
              <Text style={{ color: "#9D9FB7", fontSize: 12 }}>
                {item?.follower + " người theo dõi" || "0 người theo dõi"}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 20 }}>
            {!item?.isfollow || authenticated === false ? (
              <Button
                title="Theo dõi"
                titleStyle={{ color: "white", fontSize: 12 }}
                buttonStyle={{
                  paddingVertical: 6,
                  marginLeft: 60,
                  backgroundColor: "black",
                }}
                onPress={() =>
                  authenticated
                    ? followOneAccountById(item?.accountId)
                    : Alert.alert("Thông báo", "Bạn cần phải đăng nhập!")
                }
              />
            ) : (
              <Button
                title="Đang theo dõi"
                titleStyle={{ color: "black", fontSize: 12 }}
                buttonStyle={{
                  flex: 1,
                  paddingVertical: 6,
                  marginLeft: 46,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "black",
                }}
                onPress={() => followOneAccountById(item?.accountId)}
              />
            )}
          </View>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <FlatList
            nestedScrollEnabled
            data={[1, 2, 3]}
            renderItem={({}) => {
              return (
                <Avatar
                  onPress={() => navigateToCartDetail(item?.posts?.[0])}
                  containerStyle={{ width: "33%", height: 170 }}
                  avatarStyle={{ borderRadius: 2 }}
                  source={{
                    uri: item?.posts?.[0]?.image,
                  }}
                />
              );
            }}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  const renderItemFollowing = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            backgroundColor: "white",
            marginBottom: 30,
          }}
        >
          <Avatar
            style={{ borderRadius: 0, height: 550 }}
            source={{ uri: item?.image || imageUrlTest }}
          />
          <View style={{ marginHorizontal: 15 }}>
            <View style={{ gap: 10 }}>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <Icon source="star-outline" color={"black"} size={24} />
                  <Badge
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent",
                      color: "black",
                    }}
                    size={24}
                  >
                    {item?.likes?.length || 0}
                  </Badge>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Icon source="comment-outline" color={"black"} size={24} />
                  <Badge
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent",
                      color: "black",
                    }}
                    size={24}
                  >
                    0
                  </Badge>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Icon source="upload-outline" color={"black"} size={24} />
                  <Badge
                    style={{
                      alignSelf: "flex-start",
                      backgroundColor: "transparent",
                      color: "black",
                    }}
                    size={24}
                  >
                    0
                  </Badge>
                </View>
              </View>
              <View>
                <Text>
                  {item?.username || "Thêm username vô mỗi post giùm"}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {item?.hashPosts?.map((item, index) => (
                  <Text key={index}>{item?.hashtag?.name + " "}</Text>
                ))}
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  gap: 10,
                  borderWidth: 1.5,
                  borderColor: "grey",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <View
                  style={{
                    padding: 4,
                    borderRadius: 100,
                    backgroundColor: "grey",
                  }}
                >
                  <Icon
                    size={28}
                    source="account"
                    color="black"
                    style={{ backgroundColor: "grey" }}
                  />
                </View>

                <Text style={{ color: "grey" }}>Thêm bình luận ...</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {index === 0 && accountFollowingList?.length < 3 && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={navigateToSuggestionAccount}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 15,
                paddingBottom: 15,
              }}
            >
              <Text style={{ flex: 1, fontSize: 18, fontWeight: 600 }}>
                Đề xuất người dùng
              </Text>
              <Icon style={{ flex: 1 }} source={"chevron-right"} size={30} />
            </TouchableOpacity>
            <FlatList
              data={accountSuggestionList}
              renderItem={renderItemSuggestion}
              horizontal
              nestedScrollEnabled
            />
          </View>
        )}
        {index === 2 && accountFollowingList?.length > 2 && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={navigateToSuggestionAccount}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: 15,
                paddingBottom: 15,
              }}
            >
              <Text style={{ flex: 1, fontSize: 18, fontWeight: 600 }}>
                Đề xuất người dùng
              </Text>
              <Icon style={{ flex: 1 }} source={"chevron-right"} size={30} />
            </TouchableOpacity>
            <FlatList
              data={accountSuggestionList}
              renderItem={renderItemSuggestion}
              horizontal
              nestedScrollEnabled
            />
          </View>
        )}
      </>
    );
  };
  const renderItemSuggestion = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          fetchAccountSuggestion(item?.accountId).then((res) => {
            navigateToFriend(item);
          });
        }}
        style={{
          backgroundColor: "white",
          marginLeft: 15,
          borderRadius: 1,
          marginBottom: 20,
        }}
      >
        <Avatar
          style={{ borderRadius: 0, height: 300, width: 240 }}
          source={{ uri: item?.posts?.[0]?.image || imageUrlTest }}
        />
        <View style={{ borderWidth: 1, borderColor: "grey" }}>
          <View>
            <View
              style={{
                position: "absolute",
                bottom: -(50 - 5),
                left: 15,
                backgroundColor: "white",
                padding: 2,
                borderRadius: 100,
              }}
            >
              <Avatar
                style={{ height: 55, width: 55 }}
                avatarStyle={{ borderRadius: 100 }}
                source={{ uri: item?.user?.avatar || imageUrlTest }}
              />
            </View>
            <View
              style={{
                position: "absolute",
                right:
                  item?.follower > 9 && item?.follower < 100
                    ? 25
                    : item?.follower > 99
                    ? 20
                    : 35,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 600 }}>
                {item?.username || "user"}
              </Text>
              <Text style={{ fontSize: 11, color: "grey" }}>
                {item?.user?.height +
                  " cm" +
                  " | " +
                  item?.follower +
                  " người theo dõi"}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 60, marginBottom: 15 }}>
            {!item?.isfollow ? (
              <Button
                title={"Theo dõi"}
                titleStyle={{ color: "white", fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: "black",
                  borderWidth: 0.5,
                  borderColor: "black",
                  borderRadius: 1,
                  paddingVertical: 4,
                  marginHorizontal: 15,
                }}
                onPress={() => followOneAccountById(item?.accountId)}
              />
            ) : (
              <Button
                title={"Đang theo dõi"}
                titleStyle={{ color: "black", fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: "white",
                  borderWidth: 0.5,
                  borderColor: "black",
                  borderRadius: 1,
                  paddingVertical: 4,
                  marginHorizontal: 15,
                }}
                onPress={() => followOneAccountById(item?.accountId)}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onRefresh = React.useCallback(async () => {
    await fetchAllFetFollowingAccountWithPosts();
    setRefreshing(true);
    const getIsFollowed = async () => {
      const isFollowed = accountSuggestionList.some(
        (obj) => obj.isfollow === true
      );
      console.log("isFollowed Anyon:", isFollowed);
      setRefreshing(false);
      setIsFollowed(isFollowed);
    };
    await getIsFollowed();
    setRefreshing(false);
  }, [accountSuggestionList]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={accountSuggestionList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={HeaderComponent}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
    </View>
  );
};

const style = StyleSheet.create({
  Container: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  userContainer: {
    flex: 1,
  },
  Button: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 50,
  },
  separatorText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EveryOneSearch;
