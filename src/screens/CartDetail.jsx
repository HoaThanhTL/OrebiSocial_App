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
  KeyboardAvoidingView
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
import { fetchDeleteComment } from "../app/DeleteComment/action";

import { Swipeable } from 'react-native-gesture-handler';

const CartDetail = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);
  const [getIdAccount, setAccountId] = useState();
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);


  const [isLiked, setIsLiked] = useState(null);
  const [sttState, setSttState] = useState(
    item?.likes?.filter((item) => item.isLike === true).length
  );

  const likes = useSelector((state) => state.likePost.numberLikeOfPost);
  const commentInputRef = useRef(null);

  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(fetchDeleteComment(commentId));
      setComments(prevComments => prevComments.filter(comment => comment.CommentId !== commentId));
      setCommentCount(prevCount => prevCount - 1);
      dispatch(fetchCommentPost(item.postId)).then((result) => {
        if (result.payload && result.payload.value) {
          const data = result.payload.value.map((comment) => ({
            image: comment.image,
            username: comment.Username,
            content: comment.Content,
            commentId: comment.CommentId,

          }));
          setComments(data);
          setCommentCount(data.length);
        } else {
          console.log("Error fetching comments:", result.payload);
        }
      });
    } catch (error) {
      console.error("Error deleting comment:", error.message);

    }
  };




  useEffect(() => {
    const getAccountId = async () => {
      try {
        const accountId2 = await AsyncStorage.getItem("ACCOUNT_ID");
        console.log("Account loaded: ", accountId2);
        setAccountId(accountId2);
const hasAccountWithIdOne = item.likes.some(
          (like) => like.isLike && like.likeBy == accountId2
        );
        const filteredLikes = item.likes.filter(
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
          postId: item?.postId,
        })
      ).then(async (res) => {
        console.log("Data like: ", JSON.stringify(res, null, 2));
        await dispatch(fetchNumberLikeOfPost({ postId: item?.postId })).then(
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
  // const profile = useSelector((state) => state.user.profile);

  const handleAddComment = async () => {
    if (comment.trim() !== "") {
      try {
        // const newComment = {
        //   // image: profile.image, 
        //   // username: profile.username,
        //   content: comment,
        // };
        await dispatch(
          fetchAddCommentPost({
            postId: item.postId,
            createAt: new Date().toISOString(),
            content: comment,
          })
        );
        dispatch(fetchCommentPost(item.postId)).then((result) => {
          if (result.payload && result.payload.value) {
            const data = result.payload.value.map((comment) => ({
              image: comment.image,
              username: comment.Username,
              content: comment.Content,
              commentId: comment.CommentId,
              // accountId: comment.accountId,
            }));
            setComments(data);
            setCommentCount(data.length);
          } else {
            console.log("Error fetching comments:", result.payload);
          }
        });

        // setComments((prevComments) => [...prevComments, newComment]);


        setComment("");
      } catch (error) {
        console.error("Error dispatching fetchAddCommentPost:", error.message);
      }
    }
  };






  const savedPosts = useSelector((state) => state.save.savedPosts) || [];
  const [saving, setSaving] = useState(false);
const [saved, setSaved] = useState(savedPosts.includes(item.postId));


  const handleSave = async () => {
    try {
      if (saving) return;

      setSaving(true);

      if (saved) {

        await dispatch(unsavePost(item.postId));
        setSaved(false);
        await AsyncStorage.removeItem("SAVED_POST_" + item.postId);
        Alert.alert("Thông báo", "Đã hủy lưu bài viết thành công!");
      } else {

        await dispatch(savePost(item.postId));
        setSaved(true);
        await AsyncStorage.setItem("SAVED_POST_" + item.postId, "true");
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
        const savedState = await AsyncStorage.getItem("SAVED_POST_" + item.postId);
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

  console.log("Item id", item.postId);


  useEffect(() => {
    dispatch(fetchCommentPost(item.postId)).then((result) => {
      if (result.payload && result.payload.value) {
        const data = result.payload.value.map((comment) => ({
          image: comment.image,
          username: comment.Username,
          content: comment.Content,
          commentId: comment.CommentId,

        }));
        setComments(data);
        setCommentCount(data.length);
      } else {
        console.log("Error fetching comments:", result.payload);
      }
    });
  }, [item.postId]);
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView style={styles.container}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="close" size={40} color="white" />
        </TouchableOpacity>
        {/* Hình ảnh sản phẩm */}
        <Image source={{ uri: item.image }} style={styles.image} />

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
            onPress={() => navigateToListLike(item)}
          >
            <Text style={styles.iconText}>({sttState})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={handleComment}>
            <Icon name="chat-outline" size={24} color="black" />
            <Text style={styles.iconText}>({commentCount})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Icon name={saved ? "bookmark" : "bookmark-outline"} size={30} color={saved ? "green" : "black"} />
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
          <Text style={styles.titleText}>{item.content}</Text>
        </View>


        <View style={styles.textRow}>
          <Text style={styles.hashtagText}>
            {item.hashtags}
          </Text>
        </View>


        {/* Danh sách bình luận */}

        {/* <FlatList
        data={(showAllComments && comments) ? comments : (comments ? comments.slice(0, 4) : [])}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.avatarImage}
              />

            </View>
            <Text style={styles.usernameText}>{item.username}: </Text>
            <Text style={styles.commentText}>{item.content}</Text>

            <TouchableOpacity onPress={() => handleDeleteComment(item.commentId)}>
              <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>


          </View>
         
        )}
      />

 */}
        <FlatList
data={(showAllComments && comments) ? comments : (comments ? comments.slice(0, 4) : [])}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => (
              <View style={{
                width: 70, backgroundColor: 'red', justifyContent: 'center', marginBottom: 8,

                borderRadius: 10,
                padding: 10,

              }}>
                <TouchableOpacity onPress={() => handleDeleteComment(item.commentId)} style={styles.deleteButton}>
                  <Icon name="delete" size={24} color="white" />
                  {/* <Text style={styles.deleteButtonText}>Xóa</Text> */}
                </TouchableOpacity>
              </View>
            )}>
              <View style={styles.commentContainer}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.avatarImage}
                  />
                </View>
                <Text style={styles.usernameText}>{item.username}: </Text>
                <Text style={styles.commentText}>{item.content}</Text>
              </View>
            </Swipeable>
          )}
        />


        {/* "Read more" button */}
        {comments && comments.length > 4 && !showAllComments && (
          <TouchableOpacity onPress={() => setShowAllComments(true)}>
            <Text style={styles.readMoreButton}>Xem tất cả bình luận</Text>
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
            <Icon name="publish" size={28} color="grey" />
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
    </KeyboardAvoidingView>
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
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    padding: 10,

  },
  avatarContainer: {
    marginRight: 5,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentIcon: {
    marginLeft: 8,
  },
  commentText: {
    flex: 1,
    marginLeft: 5,
  },
  commentInputContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // marginTop: 16,
    // backgroundColor: "#F0F0F0",
    // borderRadius: 10,
    // padding: 8,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 10,
    borderWidth: 1.5,
    borderColor: "grey",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  addCommentButton: {
    color: "grey",
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
    color: "black",
    marginTop: 10,
    fontSize: 14,
    textDecorationLine: "underline",
    marginBottom: 6,
  },
usernameText: {
    fontWeight: 'bold',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 10,

    width: 70,
    justifyContent: 'center',
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
  },

});

export default CartDetail;