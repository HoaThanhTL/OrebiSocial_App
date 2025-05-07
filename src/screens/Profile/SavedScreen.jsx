import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SavedScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Đã lưu</Text>
            {/* Your content for Saved tab */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SavedScreen;