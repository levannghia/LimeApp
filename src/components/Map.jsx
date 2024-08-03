import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mapbox, { Camera, MapView, StyleImport, LocationPuck, ShapeSource, SymbolLayer, Image, Images, CircleLayer, LineLayer } from '@rnmapbox/maps'
import pin from '../assets/images/pin.png'
import { featureCollection, point } from '@turf/helpers'
import { appInfo } from '../constants/appInfo'
import scooters from '../data/scooters.json'
import routerResponse from '../data/routers.json'
import { useScooter } from '../providers/ScooterProvider'

Mapbox.setAccessToken(appInfo.MAPBOX_ACCESS_TOKEN || '');

const Map = () => {
    const { setSelectedScooter, derectionCoordinate } = useScooter();
    const points = scooters.map((scooter) => point([scooter.long, scooter.lat]))

    // useEffect(() => {
    //     Geolocation.getCurrentPosition(position => {
    //         console.log(position);
    //     })
    // }, []);

    const onPointPress = async (event) => {
        console.log(JSON.stringify(event, null, 2));
        if(event.features[0]?.coordinates) {
            setSelectedScooter(event.features[0]?.coordinates);
        }
    }

    return (
        <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/outdoors-v12'>
            <Camera
                defaultSettings={{ centerCoordinate: [-122.081190, 37.392199] }}
                centerCoordinate={[-122.081190, 37.392199]}
                animationDuration={0}
                zoomLevel={12}
                pitch={33}
            // followZoomLevel={12}
            // followUserLocation
            />
            {/* <LocationPuck
                puckBearing='heading'
                puckBearingEnabled
                pulsing={{ isEnabled: true }}
            /> */}
            <ShapeSource
                id='scooters'
                cluster
                shape={featureCollection(points)}
                onPress={onPointPress}
            >
                <SymbolLayer
                    id="clusters-count"
                    style={{
                        textField: ['get', 'point_count'],
                        textSize: 16,
                        textColor: '#ffffff',
                        textPitchAlignment: 'map'
                    }}
                />
                <CircleLayer
                    id="clusters"
                    belowLayerID='clusters-count'
                    filter={['has', 'point_count']}
                    style={{
                        circleColor: '#42E100',
                        circlePitchAlignment: 'map',
                        circleRadius: 12,
                        circleOpacity: 1,
                        circleStrokeWidth: 2,
                        circleStrokeColor: 'white'
                    }}
                />
                <SymbolLayer
                    id='scooter-icons'
                    filter={['!', ['has', 'point_count']]}
                    style={{
                        iconImage: 'pin',
                        iconSize: 0.5,
                        iconAllowOverlap: true,
                        iconAnchor: 'bottom',
                    }}
                />
                <Images images={{ pin }} />
            </ShapeSource>
            {derectionCoordinate && (
                <ShapeSource
                    id='routeSource'
                    lineMetrics
                    shape={{
                        properties: {},
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: derectionCoordinate
                        }
                    }}
                >
                    <LineLayer
                        id="exampleLineLayer"
                        style={{
                            lineColor: '#42E100',
                            lineCap: 'round',
                            lineJoin: 'round',
                            lineWidth: 6,
                            // lineDasharray: [1, 0]
                        }}
                    />
                </ShapeSource>
            )}
        </MapView>
    )
}

export default Map