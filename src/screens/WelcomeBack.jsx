import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "../app/hooks";
import { Pacifico_400Regular, useFonts } from "@expo-google-fonts/pacifico";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { loginGoogle } from "../features/userSlice";

WebBrowser.maybeCompleteAuthSession();

const WelcomeBack = ({ navigation }) => {
  const dispatch = useAppDispatch();
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  const handleGoogleLogin = async () => {
  };
  const handleCheckExitIntro = async () => {
    await dispatch(setExitIntro());
  };
  const onCompleteOnboarding = async () => {
    await AsyncStorage.setItem("appLaunched", "true");
    navigation.replace("tab");
  };


  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "904403290668-b0cd8vmtasp2d2pqe0k64s41rkssl2r3.apps.googleusercontent.com",
    webClientId:
      "904403290668-ignc5s8guh4aq4ih4bqphglajjkprtqc.apps.googleusercontent.com",
    scopes: ["profile", "email"],

  });

  useEffect(() => {
    handleLoginGoogle();
  }, [response]);

  const handleLoginGoogle = async () => {
    if (response?.type === "success") {
      console.log(
        JSON.stringify(response.authentication?.accessToken, null, 2)
      );
      getUserInfo(response.authentication?.accessToken)
     const res = await dispatch(loginGoogle(response.authentication?.accessToken));
     console.log('res', JSON.stringify(res, null, 2))
    }
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = await response.json();
      console.log(JSON.stringify(user, null, 2));
      setUserInfo(user ?? null);
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <View style={{ flex: 1, backgroundColor: "#DBE9EC" }}>
      <View>
        <Image
          source={require("../../assets/welcome.jpg")}
          style={{
            height: 530,
            width: 410,
            position: "absolute",
            top: 30,
            borderRadius: 10
          }}
        />
      </View>

      {/* content  */}

      <View
        style={{
          paddingHorizontal: 42,
          position: "absolute",
          top: 545,
          width: "100%",
        }}
      >
        {fontsLoaded && <Text style={{
          fontFamily: "Pacifico_400Regular",
          fontSize: 40,
          color: "black",
          left: 25,
        }}>Welcome Back !</Text>}

        {/* Nút Đăng Nhập Bằng Gmail */}
        <Pressable
          style={{
            backgroundColor: COLORS.secondary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 12,
            marginTop: 10,
            flexDirection: "row",
            borderColor: COLORS.secondary,
            borderWidth: 2,
          }}
          onPress={() => promptAsync()}
        >
          {/* Icon Gmail */}
          <Ionicons
            name="logo-google"
            size={24}
            color={COLORS.white}
            style={{ marginRight: 50, marginLeft: 20 }}
          />
          <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 15 }}>
            Đăng nhập bằng Gmail
          </Text>
        </Pressable>

        {/* Nút Đăng Nhập  */}
        <Pressable
          style={{
            backgroundColor: COLORS.secondary,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            borderColor: COLORS.white,
            borderWidth: 2,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: COLORS.white, fontWeight: "bold", fontSize: 16 }}>
            Đăng nhập
          </Text>
        </Pressable>

        <TouchableOpacity onPress={onCompleteOnboarding}>
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              paddingVertical: 5,
              borderRadius: 8,
              alignItems: "center",
              marginTop: 5,
              left: 100,
              fontFamily: "Pacifico_400Regular",
            }}
          >
            Không phải bây giờ{" "}
          </Text>

        </TouchableOpacity>
      </View>
    </View>

  );
};

export default WelcomeBack;
