import React, { useEffect, useState } from 'react'
import Mapbox, { Camera, MapView, LocationPuck } from '@rnmapbox/maps'
import { appInfo } from '../constants/appInfo'
import routerResponse from '../data/routers.json'
import { useScooter } from '../providers/ScooterProvider'
import LineRoute from './LineRoute'
import ScooterMarkers from './ScooterMarkers'

Mapbox.setAccessToken(appInfo.MAPBOX_ACCESS_TOKEN || '');

const Map = () => {
    const { derectionCoordinate } = useScooter();

    return (
        <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/outdoors-v12'>
            <Camera
                // defaultSettings={{ centerCoordinate: [-122.081190, 37.392199] }}
                // centerCoordinate={[-122.081190, 37.392199]}
                // animationDuration={0}
                // zoomLevel={12}
                // pitch={33}
                followZoomLevel={12}
                followUserLocation
            />
            <LocationPuck
                puckBearing='heading'
                puckBearingEnabled
                pulsing={{ isEnabled: true }}
            />
            <ScooterMarkers/>
            {derectionCoordinate && (
                <LineRoute derectionCoordinate={derectionCoordinate}/>
            )}
        </MapView>
    )
}

export default Map