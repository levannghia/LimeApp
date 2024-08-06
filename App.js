import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import ScooterProvider from './src/providers/ScooterProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthProvider from './src/providers/AuthProvider';
import AppRouters from './src/navigators/AppRouters';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScooterProvider>
        <AuthProvider>
          <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
          <AppRouters />
        </AuthProvider>
      </ScooterProvider>
    </GestureHandlerRootView>
  )
}

export default App