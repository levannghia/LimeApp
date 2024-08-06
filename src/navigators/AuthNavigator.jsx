import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { LoginScreen } from '../screens';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator