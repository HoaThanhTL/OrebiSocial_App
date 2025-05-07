import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SettingFriends = () => {
    const navigation = useNavigation();
    const handleReportPress = () => {

        navigation.navigate('ReportUser');
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBack}>
                    <Icon name="keyboard-arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cài đặt người dùng</Text>

            </View>
            <View>
                <Text style={styles.settingText}>
                    <Text style={styles.boldText}>Chặn</Text>
                </Text>
            </View>

            <TouchableOpacity onPress={handleReportPress}>
                <Text style={styles.settingText}>
                    Báo Cáo
                </Text>
            </TouchableOpacity>
            <View style={styles.hr} />




        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 50,
        backgroundColor: 'white',
    },

    settingText: {
        fontSize: 22,
        paddingTop: 10,
    },

    boldText: {
        fontWeight: 'bold',
    },
    hr: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginVertical: 5,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: 10,
    },
    settingText1: {
        fontSize: 22,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },

    headerBack: {
        right: 20,

    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',

        marginLeft: 15,
    },

    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SettingFriends;
