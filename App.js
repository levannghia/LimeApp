import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import MainNavigator from './src/navigators/MainNavigator';

const App = () => {
  return (
    <>
      <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>
  )
}

export default App