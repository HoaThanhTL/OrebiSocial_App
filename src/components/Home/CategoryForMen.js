
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryForMen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh mục cho Nam</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CategoryForMen;
