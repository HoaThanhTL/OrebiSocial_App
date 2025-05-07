import React, { userState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ROUTES from "../../constants/routes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/userSlice";
const SettingScreen = () => {


  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const profile = useAppSelector((state) => state.user.profile);



  const handleEditProfile = () => {


    navigation.navigate('UpdateProfile');

  };

  const navigateToUpdatePassword = () => {
    navigation.navigate(ROUTES.UPDATEPASSWORD);
  };

  const navigateToSettingPackage = () => {

    navigation.navigate(ROUTES.SETTINGPACKAGE);
  };

  const navigateToPackageHistory = () => {
    navigation.navigate(ROUTES.PACKAGEHISTORY);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigation.goBack()
  };

  // const handleLogout = async () => {
  //   try {
  //     const result = await dispatch(logout());
  //     console.log('Logout result:', result);


  //     if (result === true) {
  //       navigation.navigate('Login');
  //     } else {
  //       console.error('Logout failed:', result);
  //     }
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //   }
  // };

  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerBack}>
          <Icon name="keyboard-arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>
      {
        profile && <><View>
          <Text style={styles.settingText}>
            <Text style={styles.boldText}>Cài đặt của tôi</Text>
          </Text>
        </View>

          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.settingText}>Chỉnh sửa hồ sơ</Text>
          </TouchableOpacity>
          <View style={styles.hr} />
          <View>
            <TouchableOpacity onPress={navigateToUpdatePassword}>
              <Text style={styles.settingText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <View style={styles.hr} />
          </View>

          <View>
            <Text style={styles.settingText}>Người dùng bị chặn</Text>
            <View style={styles.hr} />
          </View></>
      }


      {
        profile && <>
          <Text style={styles.settingText}>
            <Text style={styles.boldText}>Gói hệ thống</Text>
          </Text>
          <View style={styles.settingItem}>
            <TouchableOpacity onPress={navigateToPackageHistory}>
              <Text style={styles.settingText}>Lịch sử mua gói thành viên</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.hr} />

          <View style={styles.settingItem}>
            <TouchableOpacity onPress={navigateToSettingPackage}>
              <Text style={styles.settingText}>Gói thành viên</Text>
            </TouchableOpacity>

            <Text style={styles.settingText1}>Premium</Text>
          </View>

          <View style={styles.hr} /></>
      }
      <Text style={styles.settingText}>
        <Text style={styles.boldText}>Giới thiệu</Text>
      </Text>

      <View>
        <Text style={styles.settingText}>Nhận xét</Text>
        <View style={styles.hr} />
      </View>

      <View>
        <Text style={styles.settingText}>Điều khoản sử dụng</Text>
        <View style={styles.hr} />
      </View>

      <View>
        <Text style={styles.settingText}>Chính sách bảo mật</Text>
        <View style={styles.hr} />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Phiên bản</Text>
        <Text style={styles.settingText1}>1.0.22</Text>
      </View>
      <View style={styles.hr} />
      {
        profile && <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={styles.textlogout}>Log out</Text>
        </TouchableOpacity>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#DBE9EC"
  },

  settingText: {
    fontSize: 22,
    paddingTop: 10,
  },

  boldText: {
    fontWeight: "bold",
  },
  hr: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 10,
  },
  settingText1: {
    fontSize: 22,
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  headerBack: {
    right: 15,

  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    right: 30,
    marginBottom: 12
  },
  logout: {
    borderWidth: 1, // Độ rộng của viền
    borderColor: 'white', // Màu của viền
    backgroundColor: 'black', // Màu nền
    paddingVertical: 10, // Khoảng cách dọc giữa nội dung và viền
    paddingHorizontal: 10, // Khoảng cách ngang giữa nội dung và viền
    borderRadius: 5, // Độ cong của góc
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  textlogout: {
    color: 'white', // Màu của chữ
    textAlign: 'center', // Căn giữa chữ
    fontSize: 16,
  },
});

export default SettingScreen;