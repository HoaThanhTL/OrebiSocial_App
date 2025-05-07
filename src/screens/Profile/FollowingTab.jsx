import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import {
    followOneAccount,

} from "../../app/Account/actions";
import { useDispatch } from 'react-redux';
import { fetchAllAccountSuggestion } from "../../services/accountService";
const FollowingTab = ({ route }) => {
    const followersData = route.params?.followersData || [];
    const dispatch = useDispatch();

    const followOneAccountById = async (accountId) => {
        try {

            Alert.alert(
                'Xác nhận',
                'Bạn có chắc muốn gỡ tài khoản này?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            try {
                                await dispatch(followOneAccount(accountId)).then(async (res) => {
                                    console.log("res", JSON.stringify(res, null, 2));
                                    if (res?.meta?.requestStatus === "fulfilled") {
                                        await fetchAllAccountSuggestion();
                                    }
                                });
                            } catch (error) { }
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error following:', error.message);
        }
    };

    const renderFollowingItem = ({ item }) => (
        <View style={styles.followerItem}>
            <Image style={styles.avatar} source={{ uri: item?.user?.avatar }} />
            <Text style={styles.username}>{item?.username}</Text>
            <TouchableOpacity style={styles.unfollowButton} onPress={() => followOneAccountById(item.accountId)}>
                <Text style={styles.unfollowButtonText}>Gỡ</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.tabContent}>
            <FlatList
                data={followersData.following}
                keyExtractor={(item) => item.accountId.toString()}
                renderItem={renderFollowingItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        marginTop: 20,
    },
    listContainer: {
        paddingHorizontal: 16,

    },
    followerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 26,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    unfollowButton: {
backgroundColor: '#FF5C5C',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    unfollowButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
export default FollowingTab;