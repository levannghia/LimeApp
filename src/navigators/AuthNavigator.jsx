import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { LoginScreen } from '../screens';
import { useStatusBar } from '../hooks/useStatusBar';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    useStatusBar('dark-content');
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator