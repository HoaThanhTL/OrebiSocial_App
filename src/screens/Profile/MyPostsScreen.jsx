import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPost } from "../../app/MyPost/action";
import { fetchLikePost } from "../../app/LikePost/action";
import { fecthListFollow, getProfile } from "../../features/userSlice";
import EmptyResult from "../Search/EmptyResult";
import ROUTES from "../../constants/routes";
import { hidePost } from "../../app/HidePosts/action";

const MyPostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const accountId = useSelector((state) => state.user.accountId);
  const dataMyPost = useSelector((state) => state.fetchMyPost?.posts);
  const [dataPost, setDataMyPost] = useState([]);
  useFocusEffect(
    useCallback(() => {
      dispatch(fetchMyPost(accountId || 0)).then((result) => {
        if (!result.error) {
        } else {
          console.log("Error received:", result.error);
        }
        console.log('result', JSON.stringify(result, null, 2))
      });
    }, [dispatch, accountId])
  );
  const [refreshing, setRefresing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefresing(true);
    const fetchData = async () => {
      // const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
      // console.log("userInfo", accountId);
      await dispatch(getProfile(accountId || 0)).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    };
    const fecthFollow = async () => {
      // const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");

      try {
        await dispatch(fecthListFollow());
      } catch (error) {
        // Handle the error or implement a retry mechanism
        console.error("Error in fecthFollow:", error);
      }
    };
    const fetchAsync = async () => {
      await fetchData();
      await fecthFollow();
      setRefresing(false);
    };

    fetchAsync();
    setRefresing(false);
  }, [accountId]);
  const navigateToListLike = (postId) => {
    const post = dataMyPost.find((p) => p.postId === postId);
    if (post) {
      navigation.navigate("ListLike", {
        dataLike: post,
      });
    }
  };

  const handleLikePress = async (postId) => {
    try {
      await dispatch(fetchLikePost({ postId }));
      await dispatch(fetchMyPost(accountId || 0));

      // Cập nhật lại dữ liệu bài viết trên giao diện
      setDataMyPost((prevData) => {
        return prevData.map((post) => {
          if (post.postId === postId) {
            return {
              ...post,
              likes: post.likes.map((like) => {
                if (like.likeBy === accountId) {
                  return {
                    ...like,
                    isLike: !like.isLike,
                  };
                }
                return like;
              }),
            };
          }
          return post;
        });
      });
    } catch (error) {
      console.error("Error dispatching likePost:", error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc muốn xóa bài viết này?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {

              await dispatch(hidePost(postId));

              await dispatch(fetchMyPost(accountId || 0));
            } catch (error) {
              console.error("Error deleting post:", error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  const navigateToCartDetail = (item) => {
    navigation.navigate("CartDetail", { item });
  };

  const navigateToEditPost = (item) => {
    navigation.navigate(ROUTES.EDIT_POST, { item });
  };

  const renderItem = ({ item }) => {
    return (
      <View key={item.postId} style={styles.postContainer}>
        <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
          <Image source={{ uri: item.image }} style={styles.postImage} />
          <TouchableOpacity
            onPress={() => navigateToEditPost(item)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(121,112,33, 0.5)",
              padding: 7,
              borderRadius: 100,
            }}
          >
            <Icon name={"file-edit"} size={24} />
          </TouchableOpacity>
          <View style={styles.postFooter}>
            <View style={[styles.iconContainer, { justifyContent: 'space-between' }]}>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => handleLikePress(item.postId)}
                >
                  <Icon
                    name={
                      item.likes.some(
                        (like) => like.isLike === true && like.likeBy == accountId
                      )
                        ? "heart"
                        : "heart-outline"
                    }
                    size={24}
                    style={{
                      color: item.likes.some(
                        (like) => like.isLike === true && like.likeBy == accountId
                      )
                        ? "red"
                        : "black",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigateToListLike(item.postId)}
                >
                  <Text style={styles.iconText}>({item.likes.length})</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                  <Icon name="chat-outline" size={24} color="black" />
                  <Text style={styles.iconText}>{item.comments}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.titleText}
              >
                {item.content}
              </Text>
              {item.hashPosts.map((hashPost, index) => (
                <Text key={index} style={styles.hashtagText}>
                  {hashPost?.hashtag?.name}
                </Text>
              ))}
            </View>
            <View style={styles.deleteButtonContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePost(item.postId)}>
                <Icon name="delete" size={24} color="#645F5F" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dataMyPost}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={EmptyResult}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//     padding: 16,
//   },
//   postContainer: {
//     marginBottom: 16,
//     marginRight: 16,
//     width: "48%",
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   postImage: {
//     width: "100%",
//     height: 200,
//     resizeMode: "cover",
//     borderRadius: 8,
//   },
//   postFooter: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//     padding: 8,
//     backgroundColor: "#f9f9f9",
//   },
//   iconContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 2,
//   },
//   icon: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginRight: 8,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     borderRadius: 20,
//     padding: 8,
//   },
//   iconText: {
//     marginLeft: 4,
//     color: "#333333",
//   },
//   textContainer: {
//     marginLeft: 8,
//   },
//   titleText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333333",
//   },
//   hashtagText: {
//     color: "#666666",
//   },
//   deleteButtonContainer: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//   },
//   deleteButton: {
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     borderRadius: 20,
//     padding: 8,
//   },
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  postContainer: {
    marginBottom: 16,
    marginRight: 16,
    width: "48%",
    borderRadius: 8,
    overflow: "hidden",
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  postFooter: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 8,
    backgroundColor: "#f9f9f9",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    // padding: 8,
  },
  iconText: {

    color: "#333333",
  },
  textContainer: {
    marginLeft: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  hashtagText: {
    color: "#666666",
  },
  deleteButtonContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 8,
  },
});

export default MyPostsScreen;
