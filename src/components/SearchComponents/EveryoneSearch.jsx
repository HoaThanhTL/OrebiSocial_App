import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Modal,
} from "react-native";
import { Avatar, Button } from "react-native-elements";
import CartEveryoneSearch from "./CartEveryoneSearch";
import images from "../../data/Image";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import products from "../../data/Products";
import ROUTES from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDetailHashtag, getHashtagById } from "../../features/postSlice";
import { ScreenHeight, ScreenWidth } from "../../screens/Post/CameraScreen";
import { imageUrlTest } from "../../utils/testData";
import { Icon } from "react-native-paper";

const EveryoneSearch = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const hashtagList = useAppSelector((state) => state.post.hashtagList);

  const navigateToCartDetail = (item) => {
    // Chuyển đến màn hình CartDetail và truyền postId
    navigation.navigate(ROUTES.CARTDETAIL, { item });
  };
  const navigateToHashtagDetail = (item) => {
    fetchHashtagByIdIncludePostList(item?.id).then((res) => {
      navigation.navigate(ROUTES.HASHTAG_DETAIL, { item });
    });
  };

  const navigateToHashtagView = () => {
    // Chuyển đến màn hình mong muốn khi TouchableOpacity được nhấn
    navigation.navigate(ROUTES.HASHTAGVIEW);
  };

  const fetchAllHashTagIncludePostList = async () => {
    try {
      await dispatch(getDetailHashtag()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log("Error fetching hashtag data:", error);
    }
  };
  const fetchHashtagByIdIncludePostList = async (id) => {
    try {
      await dispatch(getHashtagById(id)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log("Error fetching hashtag data:", error);
    }
  };
  console.log("hashtagList", JSON.stringify(hashtagList, null, 2));
  useEffect(() => {
    fetchAllHashTagIncludePostList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllHashTagIncludePostList();
    }, [])
  );

  const HashtagItem = ({ item }) => (
    <View
      style={{
        marginTop: 3,
        marginBottom: 15,
      }}
    >
      <TouchableOpacity
        onPress={() => navigateToHashtagDetail(item)}
        style={style.userContainer}
      >
        <View
          style={{
            padding: 8,
            borderRadius: 100,
            borderWidth: 0.5,
            borderColor: "grey",
          }}
        >
          <Icon source={"pound"} size={20} />
        </View>
        <View style={style.userInfo}>
          <Text style={{ fontWeight: 500, fontSize: 13 }}>{item?.name}</Text>
          <View style={style.separatorText}>
            <Text
              style={{ color: "#9D9FB7", fontSize: 13 }}
            >{`${item?.hashPosts?.length} bài viết`}</Text>
          </View>
        </View>
        <TouchableOpacity style={style.Button} onPress={navigateToHashtagView}>
          <MaterialIcons name="navigate-next" size={30} color="grey" />
        </TouchableOpacity>
      </TouchableOpacity>
      <FlatList
        data={item?.hashPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) =>
          index < 3 && (
            <TouchableOpacity onPress={() => navigateToCartDetail(item?.post)}>
              <Image
                style={{
                  width: ScreenWidth / 3 - 10,
                  height: 180,
                  marginLeft: index === 0 ? 10 : 5,

                  marginTop: 5,
                  marginBottom: 2,
                }}
                source={{ uri: item?.post?.image }}
              />
            </TouchableOpacity>
          )
        }
        numColumns={3}
        nestedScrollEnabled
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <FlatList
          data={hashtagList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <HashtagItem item={item} />}
        />
      </View>
    </View>
  );
};

export default EveryoneSearch;

const style = StyleSheet.create({
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  userInfo: {
    flex: 1, // Để Avatar và userInfo có cùng độ rộng
    marginLeft: 10,
  },
  Button: {
    justifyContent: "center",
  },
  separatorText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
