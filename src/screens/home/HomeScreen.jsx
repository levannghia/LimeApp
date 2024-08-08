import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Map, SelectedScooterSheet } from '../../components'
import { Button } from '../../components/Button'
import { supabase } from '../../lib/supabase'

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Map/>
      {/* <Button title="Sign Out" onPress={() => supabase.auth.signOut()}/> */}
      <SelectedScooterSheet/>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})