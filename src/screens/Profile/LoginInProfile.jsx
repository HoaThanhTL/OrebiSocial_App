import { View, Text, Pressable, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome6 } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useFonts } from "@use-expo/font";

import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../features/userSlice";
import { useAppDispatch } from "../../app/hooks";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
const LoginInProfile = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    });
    const dispatch = useAppDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onCompleteOnboarding = async () => {
        await AsyncStorage.setItem("appLaunched", "true");
        navigation.replace("tab");
    };
    const handleLogin = async () => {
        try {
            console.log("username: " + username, "password: " + password);
            await dispatch(
                login({ userName: username, passwordHash: password })
            ).then((res) => {
                console.log(JSON.stringify(res.meta.requestStatus, null, 2));
                if (res?.meta?.requestStatus === "fulfilled") {
                    alert("Đăng nhập thành công");
                    onCompleteOnboarding()
                    // navigation.navigate("Home");
                } else {
                    alert("Dang nhap that bai");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
    const getAccessToken = async () => {
        const accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
        console.log("AccessToken: " + "<< " + accessToken + " >>");
    };

    useEffect(() => {
        getAccessToken();
    }, [getAccessToken]);

    return (

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#DBE9EC" }}>
            <View style={{ position: 'absolute', top: 40, left: 20, padding: 7, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 50 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={30} color="white" /></TouchableOpacity>
            </View>
            <View>
                {fontsLoaded && <Text style={{
                    fontFamily: "Pacifico_400Regular",
                    fontSize: 70,
                    color: "black",
                }}>OREBI</Text>}
            </View>

            {/* content */}
            <View
                style={{
                    paddingHorizontal: 42,
                    width: "100%",
                }}
            >
                {/* Ô nhập tài khoản */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: COLORS.white,
                        paddingVertical: 12,
                        borderRadius: 50,
                        marginBottom: 25,
                        marginTop: 90,
                        paddingHorizontal: 10,
                    }}
                >
                    <Ionicons
                        name="person"
                        size={24}
                        color={COLORS.grey}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: 18,
                        }}
                        placeholder="Tên tài khoản"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>

                {/* Ô nhập mật khẩu */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: COLORS.white,
                        paddingVertical: 12,
                        borderRadius: 50,
                        marginBottom: 12,
                        paddingHorizontal: 10,
                    }}
                >
                    <Ionicons
                        name="lock-closed"
                        size={24}
                        color={COLORS.grey}
                        style={{ marginRight: 10 }}
                    />
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: 18,
                        }}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                {/* Nút Đăng Nhập */}
                <Pressable
                    style={{
                        backgroundColor: COLORS.secondary,
                        marginTop: 20,
                        paddingVertical: 15,
                        borderRadius: 50,
                        alignItems: "center",
                    }}
                    onPress={handleLogin}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        Đăng nhập
                    </Text>
                </Pressable>

                <Text
                    style={{
                        color: COLORS.black,
                        fontWeight: "bold",
                        paddingVertical: 9,
                        fontSize: 17,
                        alignItems: "center",
                        marginTop: 10,
                        marginLeft: 10,
                        left: 70,
                    }}
                    onPress={() => {
                        navigation.navigate("Signup");
                    }}
                >
                    Bạn chưa có tài khoản?
                </Text>
            </View>
        </View>

    );
};

export default LoginInProfile;
