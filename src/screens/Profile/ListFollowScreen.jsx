import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import FollowingTab from './FollowingTab';
import FollowersTab from './FollowersTab';

const Tab = createMaterialTopTabNavigator();

const BackButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
);

const ListFollowScreen = ({ navigation, route }) => {
    const { screen, profile, followersData } = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={styles.userName}> {profile?.data?.account?.username || "username"}</Text>
            </View>
            <Tab.Navigator
                screenPosition="top"
                screenOptions={{
                    style: { backgroundColor: 'white' },
                    labelStyle: { fontSize: 24 },
                    indicatorStyle: { backgroundColor: 'black' },
                    headerStyle: { backgroundColor: 'white' },
                    tabBarIndicatorStyle: { backgroundColor: 'black' },
                }}
            >
                <Tab.Screen name="Người theo dõi" component={FollowersTab} initialParams={{ followersData }} />
                <Tab.Screen name="Đang theo dõi" component={FollowingTab} initialParams={{ followersData }} />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
    },
    backButton: {
        position: 'absolute',
        left: 10,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ListFollowScreen;