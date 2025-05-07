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
import { createnewpost, getDetailHashtag } from "../../features/postSlice";
import { Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpPostDraftScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = useId();
  const goBack = () => {
    navigation.goBack();
  };

  // Lấy thông tin ảnh được chọn từ đường dẫn
  const object = route.params?.object;
  console.log('object', JSON.stringify(object, null, 2))

  // Remove object draft
  function removeObjectById(array, id) {
    console.log('array.filter(obj => obj?.id !== id)', JSON.stringify(array.filter(obj => obj?.id !== id), null, 2))
    return array.filter(obj => obj?.id !== id);
  }

  // State để lưu nội dung nhập vào ô input
  const [inputText, setInputText] = useState("");

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
        // console.log(JSON.stringify(res, null, 2));
      });
    } catch (error) {
      console.log("Error fetching hashtag data:", error);
    }
  };

  // const fetchDetailHashtag = async () => {
  //     await dispatch(getDetailHashtag()).then((res) => {
  //         console.log(JSON.stringify(res, null, 2));
  //     });
  // };

  const imageurl =
    "https://firebasestorage.googleapis.com/v0/b/bmos-image-prn.appspot.com/o/Post%2F3fc2af03-d780-47ee-ad40-152d87124620?alt=media&token=a98651a0-6204-489b-be02-b3ce8671a798";

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
  const handlePost = async () => {
    try {
      // console.log("Content: " + content, "Image: " + image, "Hashtags" + hashtags);

      await dispatch(
        createnewpost({
          Content: content,
          Image: {
            uri: selectedImage?.uri,
            type: "image/jpg",
            name: selectedImage.filename,
          },
          Hashtags: hashtagData,
        })
      ).then(async (res) => {
        console.log(JSON.stringify(res, null, 2));
        if (res?.meta?.requestStatus === "fulfilled") {
          alert(`Dang bai thanh cong ${res?.payload}`);
          Alert.alert("Thông báo", "Bài đăng đã được đăng thành công.");

          const existingData = await AsyncStorage.getItem("DRAFT_ARRAY");
          let dataArray = [];

          if (existingData) {
            dataArray = JSON.parse(existingData);
          }



          const newArray = removeObjectById(dataArray, object?.id)

          await AsyncStorage.setItem("DRAFT_ARRAY", JSON.stringify(newArray));
          navigation.reset({
            index: 0,
            routes: [{ name: ROUTES.HOME_NAVIGATOR }],
          });
        } else {
          alert(`Dang bai that bai ${res?.payload?.message}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveToStorage = async () => {
    try {
      const existingData = await AsyncStorage.getItem("DRAFT_ARRAY");
      let dataArray = [];

      if (existingData) {
        dataArray = JSON.parse(existingData);
      }

      dataArray.push({
        id: id,
        content: content,
        selectedImage: selectedImage,
        hashtagData: hashtagData,
      });

      await AsyncStorage.setItem("DRAFT_ARRAY", JSON.stringify(dataArray)).then(
        (res) => {
          navigation.navigate("Bản nháp");
        }
      );

      Alert.alert("Thông báo", "Bản nháp đã được tạo thành công.");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (object) {
      setSelectedImage(object.selectedImage);
      setHashtags(object.hashtagData);
      setHashtagData(object.hashtagData);
      setContent(object.content);
    }
  }, []);

  return (
    <>
      <Spinner visible={loading} />
      <View style={{ flex: 1, padding: 10 }}>
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.hashtagContainer}>
              <Text style={styles.hashtag}>Tải lên trang phục</Text>
            </View>
          </View>
        </View>
        <KeyboardAwareScrollView>
          {/* Hiển thị ảnh đã chọn */}
          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.selectedImage}
              />
            </View>
          )}

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
            style={[styles.button, styles.draftButton]}
            onPress={() => {
              handleSaveToStorage();
            }}
          >
            <Text style={styles.buttonText}>Bản nháp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.postButton]}
            onPress={handlePost}
          >
            <Text style={styles.buttonText}>Đăng</Text>
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
    marginTop: 20,
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

export default UpPostDraftScreen;
