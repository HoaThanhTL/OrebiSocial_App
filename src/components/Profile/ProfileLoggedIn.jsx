import React from "react";
import { View, StyleSheet, Text } from "react-native";
import HeaderProfile from "./HeaderProfile";
import ProfileTab from "./ProfileTab";

const ProfileLoggedIn = ({ profile, followersData }) => {
    return (
        <View style={styles.container}>
            <HeaderProfile profile={profile} followersData={followersData} />
            <View style={styles.hr} />
            <ProfileTab profile={profile} />
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
});

export default ProfileLoggedIn;