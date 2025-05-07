import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import ActivityTab from './ActivityTab';
import NotificationTab from './NotificationTab';

const Tab = createMaterialTopTabNavigator();

const NotiTab = () => {
    return (
        <View style={{ flex: 1, marginTop: 40, backgroundColor: 'white' }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#1C6758',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIndicatorStyle: { backgroundColor: '#1C6758' },
                    tabBarStyle: { backgroundColor: 'white', borderTopWidth: 2, borderTopColor: 'transparent' },
                    tabBarLabelStyle: { fontWeight: 'bold', fontSize: 18 },
                }}
            >
                <Tab.Screen name="Hoạt động" component={ActivityTab} />
                <Tab.Screen name="Thông báo" component={NotificationTab} />
            </Tab.Navigator>
        </View>
    );
};

export default NotiTab;
