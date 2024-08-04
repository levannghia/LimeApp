import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import MainNavigator from './src/navigators/MainNavigator';
import ScooterProvider from './src/providers/ScooterProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ScooterProvider>
        <StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ScooterProvider>
    </GestureHandlerRootView>
  )
}

export default App