import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';

const SearchInput = () => {
	const navigation = useNavigation();

	const goBack = () => {
		navigation.goBack();
	  };

	return (
		<View>
			<View style={styles.header}>
				<TouchableOpacity onPress={goBack} style={styles.backButton}>
					<Ionicons name="chevron-back" size={24} color={theme.colors.searchIcon} style={styles.icon} />
				</TouchableOpacity>
				<Text style={styles.headerText}>CHAT</Text>
			</View>

			<View style={styles.container}>
				<View style={styles.row}>
					<Icon name="search" size={20} color={theme.colors.searchIcon} />
					<TextInput style={styles.input} placeholder="Search" maxLength={10} />
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.colors.searchBackground,
		height: 60,
	},
	icon: {
		marginRight: 10,
		color: theme.colors.black,
	},
	backButton: {
        position: 'absolute',
        left: 10,
    },
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: theme.colors.searchText,
	},
	container: {
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	row: {
		backgroundColor: theme.colors.searchBackground,
		flexDirection: 'row',
		borderRadius: 5,
		height: 45,
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	input: {
		paddingHorizontal: 30,
		fontSize: 15,
		height: 45,
		flex: 1,
		color: theme.colors.searchText,
	},
});

export default SearchInput
