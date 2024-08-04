import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Map, SelectedScooterSheet } from '../../components'

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Map/>
      <SelectedScooterSheet/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})