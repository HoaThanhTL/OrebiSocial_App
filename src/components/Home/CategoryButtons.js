
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryButtons = ({ onPressMen, onPressWomen }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPressMen}>
                <Text style={styles.buttonText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onPressWomen}>
                <Text style={styles.buttonText}>Nữ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    button: {
        backgroundColor: '#99A1E8',
        padding: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CategoryButtons;
