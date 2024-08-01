import { View, Text } from 'react-native'
import React from 'react'
import Mapbox, { MapView } from '@rnmapbox/maps'
import { appInfo } from '../constants/appInfo'

Mapbox.setAccessToken(appInfo.MAPBOX_ACCESS_TOKEN)

const Map = () => {
  return (
    <MapView style={{flex: 1}} styleURL='mapbox://styles/mapbox/outdoors-v12'/>
  )
}

export default Map