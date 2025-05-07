import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';

const MoreInfo = ({ navigation }) => {
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');

    const handleContinue = () => {
        // Perform any additional logic or validation if needed

        // Navigate to the next screen or perform any action
        navigation.navigate('Home'); // You can replace 'Home' with the name of the next screen
    };

    const handleSkip = () => {
        // Show confirmation alert
        Alert.alert(
            'Xác nhận',
            'Nếu bạn bỏ qua, bạn sẽ không thể sử dụng chức năng tìm kiếm theo giới tính. Bạn có chắc muốn bỏ qua?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // Navigate to the next screen without saving information
                        navigation.navigate('Home'); // You can replace 'Home' with the name of the next screen
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={[COLORS.white, COLORS.secondary]}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <Text style={{ fontSize: 50, color: COLORS.black }}>
                        MoreInfo
                    </Text>
                </View>

                <View style={{ paddingHorizontal: 42, width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 10, borderRadius: 50, marginBottom: 12, marginTop: 100, paddingHorizontal: 10 }}>
                        <TextInput
                            style={{ flex: 1, fontSize: 16 }}
                            placeholder="Giới tính"
                            value={gender}
                            onChangeText={(text) => setGender(text)}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 10, borderRadius: 50, marginBottom: 12, paddingHorizontal: 10 }}>
                        <TextInput
                            style={{ flex: 1, fontSize: 16 }}
                            placeholder="Chiều cao"
                            value={height}
                            onChangeText={(text) => setHeight(text)}
                        />
                    </View>

                    <Pressable
                        style={{ backgroundColor: COLORS.white, marginTop: 20, marginBottom: 100, paddingVertical: 15, borderRadius: 50, alignItems: 'center' }}
                        onPress={handleContinue}
                    >
                        <Text style={{ color: COLORS.secondary, fontWeight: 'normal', fontSize: 20 }}>
                            Tiếp tục
                        </Text>
                    </Pressable>


                </View>
                <View style={{ paddingHorizontal: 20, width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Pressable
                        style={{ marginTop: 150, alignItems: 'center' }}
                        onPress={handleSkip}
                    >
                        <Text style={{ color: COLORS.black, fontWeight: 'normal', fontSize: 22 }}>
                            Bỏ qua
                        </Text>
                    </Pressable>
                </View>

            </View>
        </LinearGradient>
    );
};

export default MoreInfo;
