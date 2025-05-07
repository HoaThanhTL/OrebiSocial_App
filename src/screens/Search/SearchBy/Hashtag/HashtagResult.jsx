import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { imageUrlTest } from "../../../../utils/testData";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  FontAwesome5,
  FontAwesome6,
  Octicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import { Divider, Searchbar } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import EmptyResult from "../../EmptyResult";
import ROUTES from "../../../../constants/routes";
import { searchPostByHashtag } from "../../../../features/postSlice";
const SCREEN_WIDTH = Dimensions.get("window").width;

const GAP = 4;
const MARGIN_LEFT = 2;

const HashtagResult = () => {
  const navigation = useNavigation();
  // Fetch API
  const dispatch = useDispatch();
  const hashtagListSearch = useSelector(
    (state) => state.post.hashtagListSearch
  );
  const accountId = useSelector((state) => state.user.accountId);
  const hashtagParam = useSelector((state) => state.post.hashtagParam);
  const searchByHashtag = async () => {
    await dispatch(searchPostByHashtag(hashtagParam)).then((res) => {
      console.log(JSON.stringify(res, null, 2));
    });
  };

  useFocusEffect(
    useCallback(() => {
      searchByHashtag();
    }, [])
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 45 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SimpleLineIcons
            style={{ marginHorizontal: 10 }}
            name="arrow-left"
            size={20}
          />
        </TouchableOpacity>
        <Searchbar
          style={{
            flex: 1,
            backgroundColor: "#f0f2f5",
            marginRight: 15,
            height: 45,
          }}
          icon={() => <Octicons name="hash" size={16} />}
          inputStyle={{ alignSelf: "center" }}
          editable={false}
          value={hashtagParam}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
          marginHorizontal: 5,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 16, marginLeft: 10 }}>Bộ lọc</Text>
          <MaterialCommunityIcons name="filter-variant-minus" size={22} />
        </TouchableOpacity>
        <View
          style={{
            borderLeftWidth: 1, // Độ rộng của đường underline
            borderLeftColor: "#f0f2f5", // Màu sắc của đường underline
            height: "100%", // Chiều cao của đường underline, bạn có thể thay đổi giá trị này
          }}
        />
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 16, marginLeft: 10 }}>Sắp xếp</Text>
          <FontAwesome5 name="sort" size={22} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          data={hashtagListSearch}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  marginLeft:
                    index % 2 === 0 ? MARGIN_LEFT : GAP * 2 - MARGIN_LEFT * 2,
                  maxWidth: SCREEN_WIDTH / 2 - GAP,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(ROUTES.CARTDETAIL, { item })
                  }
                >
                  <Image
                    style={{
                      width: SCREEN_WIDTH / 2 - GAP,
                      height: 250,
                    }}
                    source={{ uri: item?.image || imageUrlTest }}
                  />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 5 }}>
                  <View
                    style={{ flexDirection: "row", marginTop: 10, gap: 10 }}
                  >
                    <Icon
                      name={
                        item.likes.some(
                          (like) =>
                            like.isLike === true && like.likeBy == accountId
                        )
                          ? "heart"
                          : "heart-outline"
                      }
                      size={24}
                      color={
                        item.likes.some(
                          (like) =>
                            like.isLike === true && like.likeBy == accountId
                        )
                          ? "red"
                          : "grey"
                      }
                    />
                    <Text>{item?.likes?.length}</Text>
                    <Icon name="chat-outline" size={24} color={"grey"} />
                    <Text>{}</Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{ marginTop: 5, fontSize: 15, fontWeight: 900 }}
                  >
                    {item?.content || ""}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      marginTop: 5,
                      marginBottom: 15,
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    {item?.hashtags?.map((item, index) => {
                      return item + " ";
                    })}
                  </Text>
                </View>
              </View>
            );
          }}
          numColumns={2}
          ListEmptyComponent={EmptyResult}
        />
      </View>
    </View>
  );
};

export default HashtagResult;

const styles = StyleSheet.create({});
