import { CircleLayer, Images, ShapeSource, SymbolLayer } from '@rnmapbox/maps'
import pin from '../assets/images/pin.png'
import React from 'react'
import scooters from '../data/scooters.json'
import { featureCollection, point } from '@turf/helpers'
import { useScooter } from '../providers/ScooterProvider'

const ScooterMarkers = () => {
    const { setSelectedScooter } = useScooter();

    const points = scooters.map((scooter) => point([scooter.long, scooter.lat], { scooter }));
    const onPointPress = async (event) => {
        if (event.features[0].properties?.scooter) {
            setSelectedScooter(event.features[0].properties.scooter);
        }
    }

    return (
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
    )
}

export default ScooterMarkers