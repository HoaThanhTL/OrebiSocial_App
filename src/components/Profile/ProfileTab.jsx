
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyPostsScreen from '../../screens/Profile/MyPostsScreen';
import FavoritesScreen from '../../screens/Profile/FavoritesScreen';
import SavedScreen from '../../screens/Profile/SavedScreen';
import MyClothesScreen from '../../screens/Profile/MyClothesScreen';

const Tab = createMaterialTopTabNavigator();

const ProfileTab = (userInfo) => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#1C6758',
                tabBarInactiveTintColor: 'gray',
                tabBarScrollEnabled: true,
                tabBarIndicatorStyle: { backgroundColor: '#1C6758' },
                tabBarStyle: { backgroundColor: 'white' },

            }}
        >
            <Tab.Screen name="Bài đăng của tôi">

                {() => <MyPostsScreen accountId={userInfo?.accountId} />}
            </Tab.Screen>
            {/* <Tab.Screen name="Yêu thích" component={FavoritesScreen} /> */}
            {/* <Tab.Screen name="Đã lưu" component={SavedScreen} /> */}
            <Tab.Screen name="Tủ quần áo của tôi" component={MyClothesScreen} />
        </Tab.Navigator>
    );
};

export default ProfileTab;
