import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch } from "../../app/hooks";
import { updateProfile, getProfile } from "../../features/userSlice";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Key "uri" in the image picker result']);
const UpdateProfileScreen = () => {
  LogBox.ignoreLogs(['Key "uri"']);
  LogBox.ignoreLogs(['Key "uri" in the image picker result']);
  LogBox.ignoreAllLogs();
  const dispatch = useAppDispatch();
  const userProfile = useSelector((state) => state.user.profile);
  const navigation = useNavigation();
  const profile = useSelector((state) => state.user.profile);
  const accountId = useSelector((state) => state.user.accountId);
  const [selectedImage, setSelectedImage] = useState("");

  const [formData, setFormData] = useState({
    key:
      userProfile && userProfile.data && userProfile.data.accountId
        ? `accountId:${userProfile.data.accountId}`
        : "",

    City: userProfile.City || "",
    Address: userProfile.Address || "",
    Height: userProfile.Height || "",
    Phone: userProfile.Phone || "",
    Gender: userProfile.Gender ? "Nam" : "Nữ",
    Dob: userProfile.Dob || "",
    Avatar: userProfile.data?.Avatar || "",
  });

  const handleChange = (name, value) => {
    const sanitizedValue = value || "";
    setFormData({ ...formData, [name]: sanitizedValue });
  };

  useEffect(() => {
    const accountId = userProfile.data?.account?.accountId || "";

    setFormData({
      key: accountId ? `accountId:${accountId}` : "",
      City: userProfile.data?.city || "",
      Address: userProfile.data?.address || "",
      Height: userProfile.data?.height || "",
      Phone: userProfile.data?.phone || "",
      Gender: userProfile.data?.gender ? "Nam" : "Nữ",
      Dob: userProfile.data?.dob || "",
      Avatar: userProfile.data?.avatar || "",
    });
  }, [userProfile]);
  const handleSubmit = async () => {
    try {
      const { City, Address, Height, Phone, Gender, Dob, Avatar } = formData;
      const key = userProfile?.data?.account?.accountId || "";

      if (!key) {
        console.error("Invalid key value");
        return;
      }

      let updatedAvatar = Avatar;

      if (selectedImage && selectedImage !== Avatar) {
        updatedAvatar = selectedImage;
      } else if (!selectedImage && !Avatar) {
        console.log("No new avatar selected, using current avatar");
updatedAvatar = userProfile.data?.avatar || ""; // Sử dụng hình hiện có nếu không có hình mới được chọn
      }

      await dispatch(updateProfile({
        key,
        City,
        Address,
        Height,
        Phone,
        Gender: Gender === "Nam",
        Dob,
        Avatar: updatedAvatar,
      }));

      await dispatch(getProfile(key));
      console.log("Profile updated successfully");
      Alert.alert("Success", "Profile updated successfully", [{
        text: "OK",
        onPress: () => {
          navigation.navigate("Profile");
        },
      }]);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

 
  const handleGoBack = () => {
    navigation.goBack();
  };

  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const handleChangeAvatar = async () => {
    Alert.alert(
      "Chọn hình ảnh",
      "Bạn muốn chọn hình ảnh từ đâu?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Camera",
          onPress: () => pickImageFromCamera(),
        },
        {
          text: "Thư viện",
          onPress: () => pickImageFromLibrary(),
        },
      ],
      { cancelable: false }
    );
  };

  const pickImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the camera is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    console.log(pickerResult)
    if (!pickerResult.canceled) {
      console.log("Hình ảnh đã được chọn từ máy ảnh:", pickerResult?.assets[0]?.uri);
      setSelectedImage(pickerResult?.assets[0]?.uri);
    }
  };

  const pickImageFromLibrary = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.canceled) {
      console.log("Hình ảnh đã được chọn từ thư viện:", pickerResult?.assets[0]?.uri);
      setSelectedImage(pickerResult?.assets[0]?.uri);
    }
  };

  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState(
    profile?.data?.gender ? "Nam" : "Nữ"
  );

  const genderOptions = ["Nam", "Nữ", "Khác"];

  const handleGenderSelect = (gender) => {
    const isMale = gender === "Nam";
    setFormData({ ...formData, Gender: isMale ? "Nam" : "Nữ" });
    setSelectedGender(gender);
    setGenderModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
// keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
    >
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>

          <TouchableOpacity onPress={handleGoBack} style={styles.headerBack}>
            <Icon name="keyboard-arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
          {/* <TouchableOpacity style={styles.headerSave} onPress={handleSubmit}>
            <Text style={styles.headerSaveText}>Hoàn tất</Text>
          </TouchableOpacity> */}
        </View>


        <View style={styles.avatarContainer}>
          <LinearGradient colors={['#DBE9EC', '#DBE9EC']} style={styles.gradient} />
          <Image
            source={{ uri: selectedImage || profile?.data?.account?.user?.avatar }}
            style={styles.profileImage}
          />

        </View>
        <View style={styles.avatarContainer}>
          <TouchableOpacity
            onPress={handleChangeAvatar}
            style={styles.changeAvatarButton}
          >
            <Text style={styles.changeAvatarText}>Thay đổi hình ảnh</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputTitle}>Ngày sinh</Text>
            <TextInput
              style={styles.input}
              placeholder="Ngày sinh"
              value={formData.Dob}
              onChangeText={(text) => handleChange("Dob", text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputTitle}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={formData.Phone}
              onChangeText={(text) => handleChange("Phone", text)}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputTitle}>Chiều cao (cm)</Text>
            <View style={styles.rowContainer}>
              <TextInput
                style={styles.halfInput}
                placeholder="Chiều cao (cm)"
                value={formData.Height.toString()}
                onChangeText={(text) => handleChange("Height", text)}
              />
              <TouchableOpacity onPress={() => setGenderModalVisible(true)}>
                <Text style={styles.genderText}>{selectedGender}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputTitle}>Thành phố/Tỉnh</Text>
            <TextInput
              style={styles.input}
              placeholder="Thành phố/Tỉnh"
              value={formData.City}
              onChangeText={(text) => handleChange("City", text)}
            />
          </View>
          <View style={styles.inputWrapper}>
<Text style={styles.inputTitle}>Địa chỉ</Text>
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ"
              value={formData.Address}
              onChangeText={(text) => handleChange("Address", text)}
            />
          </View>

        </View>
        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.headerSave} onPress={handleSubmit}>
            <Text style={styles.headerSaveText}>Hoàn tất</Text>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          animationType="slide"
          visible={genderModalVisible}
          onRequestClose={() => setGenderModalVisible(false)}
        >
          <View style={styles.genderModal}>
            {genderOptions.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={styles.genderOption}
                onPress={() => handleGenderSelect(gender)}
              >
                <Text>{gender}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",

  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: '#DBE9EC',
  },
  headerBack: {
    padding: 6,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    right: 16,
  },
  headerSave: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1C6758",
    backgroundColor: "#1C6758",
    marginTop: 10,
  },
  headerSaveText: {
    fontSize: 18,
    color: "white",
  },
  avatarContainer: {
    alignItems: "center",
    bottom: 5,


  },
  gradient: {
    width: '100%',
    height: '70%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

  },
  profileImage: {

    marginTop: 30,
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: "white",



  },
  changeAvatarButton: {


    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1C6758",
    backgroundColor: "#1C6758",
    marginTop: 10,

  },
  changeAvatarText: {
    fontSize: 18,
    color: "white",
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    // bottom: 230,
  },
  inputWrapper: {
    marginBottom: 2,
  },
  inputTitle: {
    marginBottom: 5,
    fontWeight: 'bold',

  },
  input: {
    height: 50,
    borderColor: "#bdbdbd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
justifyContent: "space-between",
    alignItems: "center",
  },
  halfInput: {
    flex: 1,
    height: 50,
    marginRight: 10,
    borderColor: "#bdbdbd",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  genderText: {
    flex: 1,
    justifyContent: "center",
    fontSize: 16,
    color: "#1C6758",

  },
  genderModal: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  genderOption: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});

export default UpdateProfileScreen;