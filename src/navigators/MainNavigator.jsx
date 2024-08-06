import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../providers/AuthProvider';
import { HomeScreen } from '../screens';

const Stack = createNativeStackNavigator();

const AppRouters = () => {
    const { isAuthenticated } = useAuth();

    return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
    );
};

export default AppRouters;