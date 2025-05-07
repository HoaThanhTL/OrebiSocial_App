import React, { useState, useEffect, useId } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import ROUTES from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createnewpost,
  getDetailHashtag,
  updatePost,
} from "../../features/postSlice";
import { Avatar, Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";
import { ScreenWidth } from "../Post/CameraScreen";

const EditPost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = useId();
  const goBack = () => {
    navigation.goBack();
  };

  const [libraryImages, setLibraryImages] = useState([]);
  const [selectedImageClick, setSelectedImageClick] = useState(null);
  const [selectedImageEdit, setSelectedImageEdit] = useState(null);

  const fetchLibraryImages = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        throw new Error("Permission to access media library not granted");
      }

      const { assets } = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first: 20,
      });

      setLibraryImages(assets);
      console.log(assets);
    } catch (error) {
      console.error("Error fetching library images:", error.message);
    }
  };

  useEffect(() => {
    fetchLibraryImages();
  }, []);

  const handleImagePress = (item) => {
    setSelectedImageClick(selectedImageClick === item ? null : item);
  };

  const handleImageChoose = () => {
    setSelectedImageEdit(selectedImageClick);
    console.log(selectedImageClick);
  };

  const item = route.params?.item;

  const dispatch = useAppDispatch();
  const hashtagList = useAppSelector((state) => state.post.hashtagList);
  const loading = useSelector((state) => state.user.loading);
  const [hashtagData, setHashtagData] = useState([]);

  useEffect(() => {
    fetchDetailHashtag();
  }, []);
  const fetchDetailHashtag = async () => {
    try {
      await dispatch(getDetailHashtag()).then((res) => {
        console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log("Error fetching hashtag data:", error);
    }
  };

  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [hashtags, setHashtags] = useState([]);

  const selectHashtag = (hashtagName) => {
    const index = hashtagData.indexOf(hashtagName);
    console.log(index);
    if (hashtagData.includes(hashtagName)) {
      const updatedArray = hashtagData.splice(index, 1);
      setHashtags(updatedArray);
    } else {
      setHashtags(hashtagData.push(hashtagName));
    }
  };
  console.log(hashtagData);
  console.log(selectedImage);
  const handlePost = async (item) => {
    try {
      // console.log("Content: " + content, "Image: " + image, "Hashtags" + hashtags);

      await dispatch(
        updatePost({
          key: item?.postId,
          Content: content,
          Image:
            selectedImageEdit !== null
              ? {
                  uri: selectedImageEdit?.uri,
                  type: "image/jpg",
                  name: selectedImageEdit.filename,
                }
              : null,
          Hashtags: hashtagData,
        })
      ).then((res) => {
        console.log(JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === "fulfilled") {
          Alert.alert("Thông báo", "Cập nhật bài đăng thành công");
          navigation.goBack();
        } else {
          alert(`Cập nhật bài đăng thất bại ${res?.payload?.message}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  function extractHashtags(hashPosts) {
    const hashtags = [];
    for (const post of hashPosts) {
      hashtags.push(post.hashtag.name);
    }
    return hashtags;
  }
  useEffect(() => {
    if (item !== undefined) {
      setContent(item?.content);
      setSelectedImage(item?.image);
      setHashtagData(extractHashtags(item?.hashPosts));
    }
  }, []);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Spinner visible={loading} />
      <View style={{ flex: 1, padding: 10 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.hashtagContainer}>
            <Text style={styles.hashtag}>Tải lên trang phục</Text>
          </View>
          <MaterialIcons name="arrow-back" size={24} color="transparent" />
        </View>
        <KeyboardAwareScrollView>
          {/* Hiển thị ảnh đã chọn */}
          {selectedImageEdit ? (
            <View style={styles.imageContainer}>
              <View>
                <Avatar
                  source={{ uri: selectedImageEdit?.uri }}
                  style={styles.selectedImage}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSelectedImageClick(null);
                    setSelectedImageEdit(null);
                  }}
                  style={{
                    position: "absolute",
                    padding: 2,
                    backgroundColor: "red",
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    top: -10,
                    right: -10,
                  }}
                >
                  <Icon source={"close"} color="white" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            selectedImage && (
              <View style={styles.imageContainer}>
                <Avatar
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                />
              </View>
            )
          )}
          {}
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                      fetchLibraryImages();
                      setSelectedImageClick(null);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Icon source={"close"} size={30} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={selectedImageClick !== null ? false : true}
                    style={{ paddingVertical: 10, paddingHorizontal: 15 }}
                    onPress={() => {
                      handleImageChoose();
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        opacity: selectedImageClick !== null ? 1 : 0.5,
                      }}
                    >
                      Chọn ảnh
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={libraryImages}
                  contentContainerStyle={{}}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => handleImagePress(item)}>
                      <Image
                        source={{ uri: item.uri }}
                        style={[
                          {
                            width: ScreenWidth / 4 - 2,
                            height: ScreenWidth / 4 - 2,
                            marginLeft: index % 2 === 0 ? 1 : 2,
                            marginBottom: 1,
                          },
                          { opacity: selectedImageClick === item ? 0.3 : 1 },
                        ]}
                      />
                    </TouchableOpacity>
                  )}
                  numColumns={4}
                />
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              alignSelf: "center",
            }}
          >
            <Icon source={"upload"} size={24} />
            <Text style={{ fontSize: 16 }}>Tải hình ảnh lên</Text>
          </TouchableOpacity>
          {/* Title "Gợi ý trang phục" */}

          <Text style={styles.title}>Gợi ý trang phục</Text>

          {/* Ô input và hint text */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Chia sẻ các mẹo tạo kiểu của bạn, như kết hợp màu sắc, tỷ lệ kích thước và nhiều mẹo khác."
              placeholderTextColor="gray"
              multiline
              value={content}
              onChangeText={(text) => setContent(text)}
            />
          </View>
          <Text style={styles.title}>#Hashtag</Text>

          <View style={styles.inputContainer}>
            <FlatList
              data={hashtagData}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => selectHashtag(item)}
                    style={{
                      marginRight: 10,
                      padding: 5,
                      borderWidth: 2,
                      borderColor: "gray",
                      borderRadius: 10,
                      backgroundColor: "#99A1E8",
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              }}
              horizontal
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Hãy chọn những #Hashtag có sẵn bạn nhé !!!</Text>
            <FlatList
              data={hashtagList}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => selectHashtag(item?.name)}
                    style={{
                      marginRight: 10,
                      marginTop: 10,
                      padding: 5,
                      borderWidth: 2,
                      borderColor: "gray",
                      borderRadius: 10,
                      backgroundColor: "#99A1E8",
                    }}
                  >
                    <Text>{item?.name}</Text>
                  </TouchableOpacity>
                );
              }}
              horizontal
            />
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.postButton]}
            onPress={() => handlePost(item)}
          >
            <Text style={styles.buttonText}>Đăng lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  hashtagContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hashtag: {
    fontWeight: "bold",
    fontSize: 18,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  selectedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  input: {
    height: 100,
    textAlignVertical: "top",
  },
  infoContainer: {
    marginTop: 20,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedInfo: {
    color: "gray",
    marginLeft: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalItem: {
    fontSize: 18,
    marginBottom: 15,
    color: "blue", // Màu chữ của từng lựa chọn
  },
  closeButton: {
    fontSize: 18,
    color: "red", // Màu chữ của nút đóng
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5,
  },

  draftButton: {
    backgroundColor: "gray", // Màu nền cho nút "Bản nháp"
  },

  postButton: {
    backgroundColor: "#99A1E8", // Màu nền cho nút "Đăng"
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditPost;
