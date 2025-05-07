import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ROUTES from '../../../constants/routes'
import NotificationScreen from '../../../screens/NotificationScreen'

const Stack = createNativeStackNavigator()
const NotificationNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name={ROUTES.NOTIFICATION} component={NotificationScreen} options={{headerShown: false,}}/>
    </Stack.Navigator>
  )
}

export default NotificationNavigator

const styles = StyleSheet.create({})