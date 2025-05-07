import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { useFonts } from '@use-expo/font';
const Start = ({ navigation }) => {

    let [fontsLoaded] = useFonts({
        Pacifico_400Regular,
    });

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.white, COLORS.secondary]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../../assets/hero1.jpg")}
                        style={{
                            height: 290,
                            width: 210,
                            borderRadius: 20,
                            position: "absolute",
                            left: 30,
                            top: 20,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-12deg" }
                            ]
                        }}
                    />
                    <Image
                        source={require("../../assets/hero2.jpg")}
                        style={{
                            height: 290,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 120,
                            left: 150,
                            transform: [
                                { translateX: 70 },
                                { translateY: 50 },
                                { rotate: "8deg" }
                            ]
                        }}
                    />
                </View>
                {/* content  */}
                <View style={{
                    paddingHorizontal: 42,
                    position: "absolute",
                    top: 500,
                    width: "100%"
                }}>
                    {fontsLoaded && <Text style={{
                        fontFamily: "Pacifico_400Regular",
                        fontSize: 50,
                        color: "black",
                    }}>OREBI</Text>}

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 20,
                            color: "black",
                            marginVertical: 4,

                        }}>Bật thông báo của bạn để nhận nội dung đặc biệt từ ứng dụng</Text>

                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Welcome");
                        }}
                        style={{
                            marginTop: 22,
                            borderRadius: 50,
                            width: "100%",
                            backgroundColor: "#1C6758",
                            borderWidth: 0,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingBottom: 12,
                            paddingVertical: 9,
                        }}
                    >
                        <Text style={{
                            color: "white",

                            fontSize: 24,
                        }}>
                            Start
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Start