import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListSave } from '../../app/ListSave/action';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const MyClothesScreen = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.listSave);
    const navigation = useNavigation();
    const navigateToCartDetail = (item) => {
        console.log("Data being passed to CartDetail:", item);
        navigation.navigate("CartDetail", { item });
    };
    const fetchListSaveCallback = useCallback(() => {
        dispatch(fetchListSave());
    }, [dispatch]);

    useFocusEffect(fetchListSaveCallback);

    useEffect(() => {
        fetchListSaveCallback();
    }, [fetchListSaveCallback]);

    return (
        <View style={styles.container}>
            <FlatList
                data={list.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigateToCartDetail(item)}>
                        <View style={styles.postItem}>
                            <Image source={{ uri: item.post.image }} style={styles.image} />
                            <View style={styles.postFooter}>
                                <TouchableOpacity style={styles.icon} onPress={() => handleLikePress()}>
                                    <Icon name="heart-outline" size={24} color="#333" />
                                </TouchableOpacity>
                                <Text style={styles.iconText}>2</Text>
                                <TouchableOpacity style={styles.icon} onPress={() => handleCommentPress()}>
                                    <Icon name="chat-outline" size={24} color="black" />
                                </TouchableOpacity>

                            </View>

                            <View style={styles.postFooter}>
                                <Text style={styles.name}>{item.post.content}</Text>

                            </View>
                            <View style={styles.postFooter}>

                                <Text style={styles.hashtagText}>{item.hashtags}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapperStyle}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    postItem: {
        justifyContent: 'flex-start',
alignItems: 'center',
        padding: 8,
        width: windowWidth / 2 - 15, // 15 là tổng padding và margin theo chiều ngang
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 10
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        // marginLeft: 20,
        padding: 8,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333333",
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    contentContainer: {
        paddingHorizontal: 5,
    },
    hashtagText: {
        color: "#666666",
    },

    icon: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 20,
        padding: 8,
    },
    iconText: {
        marginLeft: 4,
        color: "#333333",
    },
});

export default MyClothesScreen;