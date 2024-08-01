import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mapbox, { Camera, MapView, StyleImport, LocationPuck } from '@rnmapbox/maps'
import Geolocation from '@react-native-community/geolocation'
import { appInfo } from '../constants/appInfo'

Mapbox.setAccessToken(appInfo.MAPBOX_ACCESS_TOKEN)

const Map = () => {
    const [currentLocation, setCurrentLocation] = useState({});

    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            console.log(position);
        })
    }, []);
    
    return (
        <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/outdoors-v12'>
            <Camera
                // defaultSettings={{ centerCoordinate: [108.997015, 11.5653169] }}
                // centerCoordinate={[108.997015, 11.5653169]}
                // animationDuration={0}
                // zoomLevel={16}
                // pitch={33}
                followUserLocation
            />
            <LocationPuck />
        </MapView>
    )
}

export default Map