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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  followOneAccount,
  getSuggestionAccount,
  getSuggestionAccountByAccountId,
} from "../../app/Account/actions";
import { Avatar, Button } from "react-native-elements";
import { Icon } from "react-native-paper";
import ROUTES from "../../constants/routes";

const SuggestionAccount = ({ navigation }) => {
  const navigateToFriend = (item) => {
    navigation.navigate(ROUTES.FRIENDS, { item });
  };

  // ** API
  const dispatch = useDispatch();

  const accountSuggestionList = useSelector(
    (state) => state.account.accountSuggestionList
  );
  const fetchAllAccountSuggestion = async () => {
    await dispatch(getSuggestionAccount());
  };

  const fetchAccountSuggestion = async (accountId) => {
    await dispatch(getSuggestionAccountByAccountId(accountId));
  };

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
  useEffect(() => {
    const fetch = async () => {
      await fetchAllAccountSuggestion();
    };
    fetch();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 5, marginHorizontal: 15, marginBottom: 10 }}>
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
                navigateToFriend(item);
              });
            }}
            rounded
            size="medium"
            source={{
              // uri: item?.user?.avatar || imageUrlTest,
              uri: item?.user?.avatar,
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
            {!item?.isfollow ? (
              <Button
                title="Theo dõi"
                titleStyle={{ color: "white", fontSize: 12 }}
                buttonStyle={{
                  paddingVertical: 6,
                  marginLeft: 60,
                  backgroundColor: "black",
                }}
                onPress={() => followOneAccountById(item?.accountId)}
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
                  onPress={() => navigateToCartDetail(item)}
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
      </View>
    );
  };
  const Header = () => (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 40,
          marginHorizontal: 5,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon source={"chevron-left"} size={40} />
        </TouchableOpacity>

        <Text style={{ fontSize: 17, fontWeight: 500 }}>
          Đề xuất người dùng
        </Text>
        <View style={{ width: 40 }} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>NAM</Text>
          <Icon source={"chevron-down"} size={30} />
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Text>|</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Khu vực(17)</Text>
          <Icon source={"chevron-down"} size={30} />
        </View>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList data={accountSuggestionList} renderItem={renderItem} />
    </View>
  );
};

export default SuggestionAccount;

const styles = StyleSheet.create({});
