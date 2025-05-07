import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { fecthActivePost } from "../../app/ActivePost/action";
import { FlatList } from "react-native";
import { fetchLikePost } from "./../../app/LikePost/action";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [dataActivePost, setDataActivePost] = useState();
  const [likedPosts, setLikedPosts] = useState([]);
  const [accountId, setAccountId] = useState();
  const [loadData, setLoadData] = useState(false);
  const dataActive = useSelector((state) => state.activePost.dataActivePost);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAccountId = async () => {
      try {
        const accountId2 = await AsyncStorage.getItem("ACCOUNT_ID");
        console.log("Account loaded: ", accountId2);
        setAccountId(accountId2);
      } catch (error) {
        console.error("Error getting access accountId:", error);
        throw error;
      }
    };
    getAccountId();
  }, [loadData]);
  useFocusEffect(
    useCallback(() => {
      dispatch(fecthActivePost()).then((result) => {
        if (result.payload) {
          console.log("Data received:", result.payload);
          const data = result.payload.map((post) => ({
            ...post,
            isLiked: false,
          }));
          setDataActivePost(data);
          setLikedPosts([]);
        } else {
          console.log("Error received");
        }
      });
    }, [])
  );
  const handleLikePress = async (postId) => {
    setLoadData(!loadData);
    const index = dataActive.findIndex((post) => post.postId === postId);
    try {
      await dispatch(
        fetchLikePost({
          postId: postId,
        })
      );
      await dispatch(fecthActivePost()).then((result) => {
        if (result.payload) {
          console.log("Data received:", result.payload);
          const data = result.payload.map((post) => ({
            ...post,
            isLiked: false,
          }));
          setDataActivePost(data);
          setLikedPosts([]);
        } else {
          console.log("Error received");
        }
      });
    } catch (error) {
      console.error("Error dispatching likePost:", error.message);
    }
    setDataActivePost((prevData) => {
      const newData = [...prevData];
      console.log("Id", postId);
      newData[index] = {
        ...newData[index],
        isLiked: !newData[index]?.isLiked,
      };
      return newData;
    });

    setLikedPosts((prevLikedPosts) => {
      if (prevLikedPosts.includes(postId)) {
        return prevLikedPosts.filter((id) => id !== postId);
      } else {
        return [...prevLikedPosts, postId];
      }
    });
  };

  const navigateToListLike = (postId) => {
    const post = dataActive.find((p) => p.postId === postId);
    if (post) {
      navigation.navigate("ListLike", {
        dataLike: post,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.postId} style={styles.postContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CartDetail", { item })}
      >
        <Image source={{ uri: item.image }} style={styles.postImage} />
        <View style={styles.postFooter}>
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
                size={27}
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
            <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate("CartDetail", { item })}>
              <Icon name="chat-outline" size={27} color="black" />
              <Text style={styles.iconText}></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textRow}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.titleText}
              >
                {item.content}
              </Text>
            </View>

            <View style={styles.textRow}>
              <Text style={styles.hashtagText}>{item.hashtags}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        height={"90%"}
        data={dataActive}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 8,
    marginRight: 16,
    width: "48%",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 8,
    padding: 2,
  },
  postImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 8,
  },
  postFooter: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 8,
    backgroundColor: "#f9f9f9",
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 2,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 20,
    padding: 2,
  },
  iconText: {
    marginLeft: 4,
    color: "#333333",
    fontSize: 17,
  },
  textContainer: {
    marginLeft: 4,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  hashtagText: {
    color: "#666666",
    marginTop: 4,
  },
});

export default Cart;
