import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../providers/AuthProvider';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const AppRouters = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppRouters