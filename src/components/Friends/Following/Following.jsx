import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, Searchbar } from "react-native-paper";
import { Avatar } from "react-native-elements";
import { imageUrlTest } from "../../../utils/testData";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  followOneAccount,
  getFollowerAndFollowingByAccountId,
} from "../../../app/Account/actions";

const Following = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const account = route.params?.account;
  const dispatch = useDispatch();
  const accountFollowInfo = useSelector(
    (state) => state.account.accountFollowInfo
  );
  const accountId = useSelector((state) => state.user.accountId);
  console.log(accountFollowInfo);

  const fetchFollowerAndFollowingByAccountId = async () => {
    dispatch(getFollowerAndFollowingByAccountId(account?.accountId));
  };

  const followOneAccountById = async (accountId) => {
    try {
      await dispatch(followOneAccount(accountId)).then(async (res) => {
        console.log(res?.payload?.isfollow === true ? "Following" : "Unfollow");
        if (res?.meta?.requestStatus === "fulfilled") {
          await fetchFollowerAndFollowingByAccountId();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 15,
          marginTop: 5,
          marginBottom: 10,
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Avatar
            source={{ uri: item?.user?.avatar ?? imageUrlTest }}
            avatarStyle={{ borderRadius: 100 }}
            size={40}
          />
          <View>
            <Text style={{ fontWeight: 600 }}>{item?.firstname}</Text>
            <Text style={{ color: "grey" }}>{"@" + item?.username}</Text>
          </View>
        </View>
        {item?.accountId !== accountId &&
          (!item?.isfollow ? (
            <TouchableOpacity
              onPress={() => followOneAccountById(item?.accountId)}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 18,
                backgroundColor: "black",
              }}
            >
              <Text style={{ color: "white" }}>Theo dõi</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => followOneAccountById(item?.accountId)}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 18,
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>Đang theo dõi</Text>
            </TouchableOpacity>
          ))}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon source={"chevron-left"} size={40} color="grey" />
        </TouchableOpacity>
        <Text style={{ fontWeight: 600, fontSize: 17 }}>Đang theo dõi</Text>
        <Icon source={"chevron-left"} size={40} color="transparent" />
      </View>
      <View>
        <Searchbar
          style={{
            marginTop: 10,
            backgroundColor: "#f0f2f5",
            marginHorizontal: 15,
            height: 45,
          }}
          icon={() => <Icon source="at" size={16} color="grey" />}
          inputStyle={{ alignSelf: "center" }}
          //   editable={false}
          //   value={hashtagParam}
          placeholder="Tìm kiếm tên người dùng"
          placeholderTextColor={"grey"}
        />
      </View>
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList data={accountFollowInfo?.following} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default Following;

const styles = StyleSheet.create({});
