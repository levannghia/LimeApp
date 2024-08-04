import { LineLayer, ShapeSource } from '@rnmapbox/maps'
import React from 'react'

const LineRoute = ({ derectionCoordinate }) => {
    return (
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
    )
}

export default LineRoute