import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ReportPost = () => {
    const navigation = useNavigation();
    const [reasons, setReasons] = useState({
        behavior: false,
        dislike: false,
        spamOrScam: false,
        dangerousContent: false,
        notSuitable: false,
        other: false,
    });

    const [otherReason, setOtherReason] = useState('');

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSave = () => {

        console.log('Selected reasons:', reasons);
        console.log('Other reason:', otherReason);

    };

    const toggleReason = (reason) => {
        setReasons((prevReasons) => ({
            ...prevReasons,
            [reason]: !prevReasons[reason],
        }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleGoBack} style={styles.headerBack}>
                    <Icon name="keyboard-arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Báo cáo bài viết</Text>
                <TouchableOpacity style={styles.headerSave} onPress={handleSave}>
                    <Text style={styles.headerSaveText}>Hoàn tất</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.reasonContainer}>
                <ReasonCheckbox
                    label='Bài đăng này không phù hợp'
                    checked={reasons.behavior}
                    onPress={() => toggleReason('behavior')}
                />
                <ReasonCheckbox
                    label='Tôi không thích bài đăng này'
                    checked={reasons.dislike}
                    onPress={() => toggleReason('dislike')}
                />
                <ReasonCheckbox
                    label='Bài đăng này là thư rác hoặc lừa đảo'
                    checked={reasons.spamOrScam}
                    onPress={() => toggleReason('spamOrScam')}
                />
                <ReasonCheckbox
                    label='Bài đăng này khiến mọi người gặp nguy hiểm'
                    checked={reasons.dangerousContent}
                    onPress={() => toggleReason('dangerousContent')}
                />
                <ReasonCheckbox
                    label='Bài đăng này không nên có trên OREBI'
                    checked={reasons.notSuitable}
                    onPress={() => toggleReason('notSuitable')}
                />
                <ReasonCheckbox
                    label='Lý do khác'
                    checked={reasons.other}
                    onPress={() => toggleReason('other')}
                />
                {reasons.other && (
                    <TextInput
                        style={styles.otherReasonInput}
                        placeholder='Nhập lý do khác'
                        value={otherReason}
                        onChangeText={setOtherReason}
                    />
                )}
            </View>
        </View>
    );
};

const ReasonCheckbox = ({ label, checked, onPress }) => {
    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
            <View style={styles.checkbox}>
                {checked && <Icon name="check" size={20} color="black" />}
            </View>
            <Text style={styles.checkboxLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 50,
        backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
    },
    headerBack: {
        right: 20,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSave: {
        marginLeft: 10,
    },
    headerSaveText: {
        fontSize: 16,
        color: 'gray',
    },
    reasonContainer: {
        marginTop: 20,
    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'black',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 16,
    },
});

export default ReportPost;
