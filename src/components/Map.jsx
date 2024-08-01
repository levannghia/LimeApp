import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Mapbox, { Camera, MapView, StyleImport } from '@rnmapbox/maps'
import { appInfo } from '../constants/appInfo'

Mapbox.setAccessToken(appInfo.MAPBOX_ACCESS_TOKEN)

const Map = () => {
    const [lightPreset, setLightPreset] = useState('night');
    const nextLightPreset = lightPreset === 'night' ? 'day' : 'night';
    return (
        <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/outdoors-v12'>
            <Camera
                defaultSettings={{ centerCoordinate: [108.997015, 11.5653169] }}
                centerCoordinate={[108.997015, 11.5653169]}
                animationDuration={0}
                zoomLevel={16}
                pitch={33}
            />
            <StyleImport
                id="basemap"
                existing
                config={{
                    lightPreset: lightPreset,
                }}
            />
        </MapView>
    )
}

export default Map