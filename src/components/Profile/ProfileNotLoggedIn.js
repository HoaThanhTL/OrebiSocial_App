// ProfileNotLoggedIn.js
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import HeaderProfile from "./HeaderProfile";
import { useNavigation } from "@react-navigation/native";
import ProfileTab from "./ProfileTab";

const ProfileNotLoggedIn = () => {
    const navigation = useNavigation();
    const handleSetting = () => {
        console.log("userInfo in handleSetting: ", userInfo);
        navigation.navigate("Setting", { userInfo });
    };

    const handleSignin = () => {
        navigation.navigate("Login");
    };
    return (
        <View style={styles.container}>
            <HeaderProfile />
            <View style={styles.hr} />
            <View style={styles.notLoggedInContainer}>
                <TouchableOpacity onPress={() => handleSignin()}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Đăng nhập</Text>
                    </View>
                </TouchableOpacity>

            </View>
            {/* <ProfileTab /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    hr: {
        borderBottomColor: "lightgray",
        borderBottomWidth: 1,
        marginTop: 20,
    },
    notLoggedInContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    notLoggedInText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: "black",
        color: "white",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignSelf: "center",
    },
    loginButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default ProfileNotLoggedIn;
