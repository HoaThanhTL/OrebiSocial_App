import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../features/userSlice';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleResetPassword = async () => {
        try {
            if (!email) {
                Alert.alert("Please enter your email.");
                return;
            }
            setLoading(true);
            await dispatch(resetPassword(email));
            Alert.alert("Password reset email sent successfully.");
        } catch (error) {
            Alert.alert("An error occurred while sending reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 40, left: 20, padding: 7, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 50 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={30} color="white" /></TouchableOpacity>
            </View>
            <Text style={styles.title}>Quên mật khẩu</Text>
            <View style={styles.inputWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            <TouchableOpacity
                style={styles.sendButton}
                onPress={handleResetPassword}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.sendButtonText}>Gửi Email</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DBE9EC',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputTitle: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        flex: 1,
    },
    sendButton: {
        backgroundColor: '#1C6758',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
justifyContent: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});