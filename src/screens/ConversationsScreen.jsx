import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons';

import Conversations from '../components/Conversations';
import SearchInput from '../components/common/SearchInput';

import { theme } from '../constants/theme';
import { fabStyles } from '../constants/styles';

const ConversationsScreen = () => {
	return (
		<View style={{ backgroundColor: theme.colors.white, flex: 1, marginTop: 30}}>
			<Conversations>
				<SearchInput />
			</Conversations>
			<TouchableOpacity onPress={() => {}} style={fabStyles.style}>
				<Icon name="chat" size={30} color={theme.colors.primary} />
			</TouchableOpacity>
		</View>
	)
}

export default ConversationsScreen