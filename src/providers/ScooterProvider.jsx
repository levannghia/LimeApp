import { createContext, useContext, useEffect, useState } from "react";
import Geolocation from '@react-native-community/geolocation'
import { getDirections } from '../services/directions'

const ScooterContext = createContext({});

export default function ScooterProvider({ children }) {
    const [currentLocation, setCurrentLocation] = useState({});
    const [selectedScooter, setSelectedScooter] = useState();
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        const fetchDirection = async () => {
            Geolocation.getCurrentPosition(position => {
                console.log(position);
            })

            const newDirection = await getDirections([-122.081190, 37.392199], [selectedScooter.longitude, selectedScooter.latitude]);
            setDirection(newDirection);
        }

        if (selectedScooter) {
            fetchDirection();
        }
    }, [selectedScooter]);

    return (
        <ScooterContext.Provider value={{
            selectedScooter,
            setSelectedScooter,
            direction,
            derectionCoordinate: direction?.routes[0]?.geometry.coordinates,
            routeTime: direction?.routes[0]?.duration,
            routeDistance: direction?.routes[0]?.distance,
        }}
        >
            {children}
        </ScooterContext.Provider>
    )
}

export const useScooter = () => useContext(ScooterContext);
