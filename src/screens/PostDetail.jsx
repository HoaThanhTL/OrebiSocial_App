import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Linking,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import products from "../data/Products";
import Cart from "../components/Home/Cart";
import { fecthActivePost } from "../app/ActivePost/action";
import { fetchCommentPost } from "../app/CommentPost/action";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddCommentPost } from "../app/AddComment/action";
import { fetchLikePost, fetchNumberLikeOfPost } from "../app/LikePost/action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { savePost, unsavePost } from "../app/SavePost/action";
const PostDetail = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState();
  const [getIdAccount, setAccountId] = useState();
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const [isLiked, setIsLiked] = useState(null);
  const [sttState, setSttState] = useState(
    item?.post?.likes?.filter((item) => item?.post?.isLike === true).length
  );

  const likes = useSelector((state) => state.likePost.numberLikeOfPost);
  const commentInputRef = useRef(null);

  useEffect(() => {
    const getAccountId = async () => {
      try {
        const accountId2 = await AsyncStorage.getItem("ACCOUNT_ID");
        console.log("Account loaded: ", accountId2);
        setAccountId(accountId2);
        const hasAccountWithIdOne = item?.post?.likes.some(
          (like) => like.isLike && like.likeBy == accountId2
        );
        const filteredLikes = item?.post?.likes.filter(
          (like) => like.isLike && like.likeBy == accountId2
        );
        console.log("Filtered data: ", filteredLikes);
        console.log("hasAccountWithIdOne", hasAccountWithIdOne);
        if (hasAccountWithIdOne === true) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error getting access accountId:", error);
        throw error;
      }
    };
    getAccountId();
  }, []);

  console.log(likes);

  const handleLikePress = async () => {
    setIsLiked(!isLiked);

    setSttState((prevSttState) => {
      const likeChange = isLiked ? -1 : 1;

      return prevSttState + likeChange;
    });

    try {
      await dispatch(
        fetchLikePost({
          postId: item?.post?.postId,
        })
      ).then(async (res) => {
        console.log("Data like: ", JSON.stringify(res, null, 2));
        await dispatch(fetchNumberLikeOfPost({ postId: item?.post?.postId })).then(
          (res) => {
            console.log("Length like: ", JSON.stringify(res, null, 2));
          }
        );
      });
    } catch (error) {
      console.error("Error dispatching likePost:", error.message);
    }
  };

  const navigateToListLike = (item) => {
    navigation.navigate("ListLike", {
      dataLike: item,
    });
  };

  const handleAddComment = async () => {
    if (comment.trim() !== "") {
      try {
        await dispatch(
          fetchAddCommentPost({
            postId: item?.post?.postId,
            createAt: new Date().toISOString(),
            content: comment,
          })
        );

        setComments((prevComments) => [...prevComments, comment]);

        setComment("");
      } catch (error) {
        console.error("Error dispatching fetchAddCommentPost:", error.message);
      }
    }
  };

  const savedPosts = useSelector((state) => state.save.savedPosts) || [];
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(savedPosts.includes(item?.post?.postId));

  // const handleSave = async () => {
  //   try {
  //     if (saving) return;

  //     setSaving(true);

  //     if (saved) {
  //       // Nếu bài viết đã được lưu, thực hiện hủy lưu
  //       await dispatch(unsavePost(item.postId));
  //       setSaved(false);
  //       Alert.alert("Thông báo", "Đã hủy lưu bài viết thành công!");
  //     } else {
  //       // Nếu bài viết chưa được lưu, thực hiện lưu
  //       await dispatch(savePost(item.postId));
  //       setSaved(true);
  //       Alert.alert("Thông báo", "Lưu bài viết thành công!");
  //     }
  //   } catch (error) {
  //     console.error("Error saving post:", error.message);
  //     Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const handleSave = async () => {
    try {
      if (saving) return;

      setSaving(true);

      if (saved) {
        // Nếu bài viết đã được lưu, thực hiện hủy lưu
        await dispatch(unsavePost(item?.post?.postId));
        setSaved(false);
        await AsyncStorage.removeItem("SAVED_POST_" + item?.post?.postId); // Xóa trạng thái đã lưu từ AsyncStorage
        Alert.alert("Thông báo", "Đã hủy lưu bài viết thành công!");
      } else {
        // Nếu bài viết chưa được lưu, thực hiện lưu
        await dispatch(savePost(item?.post?.postId));
        setSaved(true);
        await AsyncStorage.setItem("SAVED_POST_" + item?.post?.postId, "true");
        console.log("lưu bài viết thành công");
        Alert.alert("Thông báo", "Lưu bài viết thành công!");
      }
    } catch (error) {
      console.error("Error saving post:", error.message);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const getSavedState = async () => {
      try {
        const savedState = await AsyncStorage.getItem(
          "SAVED_POST_" + item?.post?.postId
        );
        if (savedState === "true") {
          setSaved(true);
        } else {
          setSaved(false);
        }
      } catch (error) {
        console.error("Error getting saved state:", error);
      }
    };

    getSavedState();
  }, []);

  const openReportModal = () => {
    setReportModalVisible(true);
  };

  const closeReportModal = () => {
    setReportModalVisible(false);
  };

  const handleReportOptionPress = () => {
    console.log("Reported");
    closeReportModal();
  };
  const handleReporPost = () => {
    closeReportModal();
    navigation.navigate("ReportPost");
  };

  console.log("Item id", item?.post?.postId);
  useEffect(() => {
    dispatch(fetchCommentPost(item?.post?.postId)).then((result) => {
      if (result.payload && result.payload.value) {
        const data = result.payload.value.map((comment) => comment.Content);
        setComments(data);
        setCommentCount(data.length);
      } else {
        console.log("Error fetching comments:", result.payload);
      }
    });
  }, [item?.post?.postId]);

  const handleLike = () => {
    if (isLiked === true) {
      handleLikePress(1);
    } else {
      handleLikePress(-1);
    }
  };
  const handleComment = () => {
    commentInputRef.current.focus();
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="close" size={40} color="white" />
      </TouchableOpacity>
      {/* Hình ảnh sản phẩm */}
      <Image source={{ uri: item?.post?.image }} style={styles.image} />

      {/* Icon trái tim và bình luận */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={handleLikePress}>
          <Icon
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigateToListLike(item?.post)}
        >
          <Text style={styles.iconText}>({sttState})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleComment}>
          <Icon name="chat-outline" size={24} color="black" />
          <Text style={styles.iconText}>({commentCount})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon
            name={saved ? "bookmark" : "bookmark-outline"}
            size={30}
            color={saved ? "red" : "black"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreOptionsIcon}
          onPress={openReportModal}
        >
          <Icon name="dots-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Report Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={closeReportModal}
      >
        <TouchableWithoutFeedback onPress={closeReportModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.reportModal}>
          <Text style={styles.reportOption} onPress={handleReporPost}>
            Báo Cáo
          </Text>
          <Text style={styles.closeReportModal} onPress={closeReportModal}>
            Cancel
          </Text>
        </View>
      </Modal>
      <View style={styles.textRow}>
        <Text style={styles.titleText}>{item?.post?.content}</Text>
      </View>

      <View style={styles.textRow}>
        <Text style={styles.hashtagText}>{item?.post?.hashtags}</Text>
      </View>

      {/* Danh sách bình luận */}
      <FlatList
        data={
          showAllComments && comments
            ? comments
            : comments
            ? comments.slice(0, 4)
            : []
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text>{item}</Text>
          </View>
        )}
      />

      {/* "Read more" button */}
      {comments && comments.length > 4 && !showAllComments && (
        <TouchableOpacity onPress={() => setShowAllComments(true)}>
          <Text style={styles.readMoreButton}>Xem thêm</Text>
        </TouchableOpacity>
      )}

      {/* "Read less" button */}
      {showAllComments && (
        <TouchableOpacity onPress={() => setShowAllComments(false)}>
          <Text style={styles.readMoreButton}>Thu gọn</Text>
        </TouchableOpacity>
      )}

      {/* Phần nhập bình luận */}
      <View style={styles.commentInputContainer}>
        <TextInput
          ref={commentInputRef}
          style={styles.commentInput}
          placeholder="Thêm bình luận ..."
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity onPress={handleAddComment}>
          <Icon name="send-outline" size={24} color="blue" />
        </TouchableOpacity>
      </View>

      {/* Link sản phẩm */}
      <Text style={styles.linkSPText}>Link sản phẩm:</Text>
      <Text
        style={styles.linkText}
        onPress={() => Linking.openURL("https://www.fptshop.com")}
      >
        www.fptshop.com
      </Text>

      {/* Các sản phẩm liên quan 
      <View style={styles.relatedProductsContainer}>
<Text style={styles.relatedProductsTitle}>Các sản phẩm liên quan:</Text>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
              <Cart item={item} />
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      </View>*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backButton: {
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: 600,
    resizeMode: "cover",
    marginBottom: 16,
  },
  hashtagText: {
    color: "black",
    marginTop: 5,
    marginLeft: -10,
    marginBottom: 10,
    left: 20,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "start",
    marginBottom: 5,
    left: 20,
  },

  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 10,
    left: 15,
  },
  commentIcon: {
    marginLeft: 8,
  },
  commentText: {
    flex: 1,
    marginLeft: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    padding: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  addCommentButton: {
    color: "blue",
    fontWeight: "bold",
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 5,
    left: 10,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  iconText: {
    marginLeft: 5,
  },
  linkText: {
    color: "blue",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    textDecorationLine: "underline",
  },
  linkSPText: {
    color: "black",
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    // textDecorationLine: 'underline',
  },

  relatedProductsContainer: {
    marginTop: 20,
  },

  relatedProductsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  moreOptionsIcon: {
    position: "absolute",

    right: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  reportModal: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  reportOption: {
    fontSize: 18,
    marginBottom: 10,
    color: "black",
  },
  closeReportModal: {
    fontSize: 18,
    color: "red",
    marginTop: 10,
  },
  readMoreButton: {
    padding: 8,
    color: "grey",
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default PostDetail;
