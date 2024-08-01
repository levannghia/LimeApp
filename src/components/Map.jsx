import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mapbox, { Camera, MapView, StyleImport, LocationPuck, ShapeSource, SymbolLayer, Image, Images } from '@rnmapbox/maps'
import Geolocation from '@react-native-community/geolocation'
import pin from '../assets/images/pin.png'
import {featureCollection, point} from '@turf/helpers'
import { appInfo } from '../constants/appInfo'
import scooters from '../data/scooters.json'

Mapbox.setAccessToken(appInfo.MAPBOX_ACCESS_TOKEN || '');

const Map = () => {
    const [currentLocation, setCurrentLocation] = useState({});
    const points = scooters.map((scooter) => point([scooter.long, scooter.lat]))


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
                followZoomLevel={12}
                followUserLocation
            />
            <LocationPuck
                puckBearing='heading'
                puckBearingEnabled
                pulsing={{ isEnabled: true }}
            />
            <ShapeSource id='scooters'
                cluster
                shape={featureCollection(points)}
            >
                <SymbolLayer
                    id='scooter-icons'
                    style={{
                        iconImage: 'pin',
                        iconSize: 0.5,
                        iconAllowOverlap: true,
                        iconAnchor: 'bottom',
                    }}
                >

                </SymbolLayer>
                <Images images={{pin}}/>
            </ShapeSource>
        </MapView>
    )
}

export default Map