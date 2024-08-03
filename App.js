import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import MainNavigator from './src/navigators/MainNavigator';
import ScooterProvider from './src/providers/ScooterProvider';

const App = () => {
  return (
    <ScooterProvider>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ScooterProvider>
  )
}

export default App