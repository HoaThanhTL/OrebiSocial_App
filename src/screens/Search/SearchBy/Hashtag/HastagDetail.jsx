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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import EmptyResult from "../../EmptyResult";
import ROUTES from "../../../../constants/routes";
import { getHashtagById, searchPostByHashtag } from "../../../../features/postSlice";
const SCREEN_WIDTH = Dimensions.get("window").width;

const GAP = 4;
const MARGIN_LEFT = 2;

const HashtagDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const item = route.params?.item;
  // Fetch API
  const dispatch = useDispatch();
  const hashtagObject = useSelector((state) => state.post.hashtagObject);
  const accountId = useSelector((state) => state.user.accountId);
  const hashtagParam = useSelector((state) => state.post.hashtagParam);
  const fetchHashtagByIdIncludePostList = async () => {
    try {
      await dispatch(getHashtagById(item?.id)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log("Error fetching hashtag data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHashtagByIdIncludePostList();
    }, [])
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 45,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SimpleLineIcons
            style={{ marginHorizontal: 10 }}
            name="arrow-left"
            size={20}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, fontWeight: 600 }}>
          {hashtagObject?.name}
        </Text>
        <SimpleLineIcons
          style={{ marginHorizontal: 10 }}
          name="arrow-left"
          size={20}
          color={"transparent"}
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
            justifyContent: "space-between",
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
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, marginLeft: 10 }}>Sắp xếp</Text>
          <FontAwesome5 name="sort" size={22} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          data={hashtagObject?.hashPosts}
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
                    navigation.navigate(ROUTES.CARTDETAIL, { item: item?.post })
                  }
                >
                  <Image
                    style={{
                      width: SCREEN_WIDTH / 2 - GAP,
                      height: 250,
                    }}
                    source={{ uri: item?.post?.image || imageUrlTest }}
                  />
                </TouchableOpacity>
                <View style={{ marginHorizontal: 5 }}>
                  <View
                    style={{ flexDirection: "row", marginTop: 10, gap: 10 }}
                  >
                    <Icon
                      name={
                        item?.post?.likes.some(
                          (like) =>
                            like.isLike === true && like.likeBy == accountId
                        )
                          ? "heart"
                          : "heart-outline"
                      }
                      size={24}
                      color={
                        item?.post?.likes.some(
                          (like) =>
                            like.isLike === true && like.likeBy == accountId
                        )
                          ? "red"
                          : "grey"
                      }
                    />
                    <Text>{item?.post?.likes?.length}</Text>
                    <Icon name="chat-outline" size={24} color={"grey"} />
                    <Text>{}</Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={{ marginTop: 5, fontSize: 15, fontWeight: 900 }}
                  >
                    {item?.post?.content || ""}
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
                    {item?.post?.hashtags?.map((item, index) => {
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

export default HashtagDetail;

const styles = StyleSheet.create({});
