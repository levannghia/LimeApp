import { createContext, useContext, useEffect, useState } from "react";
import Geolocation from '@react-native-community/geolocation'
import { getDirections } from '../services/directions'

const ScooterContext = createContext({});

export default function ScooterProvider({ children }) {
    const [currentLocation, setCurrentLocation] = useState({});
    const [selectedScooter, setSelectedScooter] = useState();
    const [direction, setDirection] = useState(null);
    const [isNearBy, setIsNearBy] = useState(false);

    useEffect(() => {
        const fetchDirection = async () => {
            Geolocation.getCurrentPosition(position => {
                // console.log(position);
                if (position.coords) {
                    setCurrentLocation({
                      lat: position.coords.latitude,
                      long: position.coords.longitude,
                    });
                  }
            })
            // console.log(currentLocation);
            const newDirection = await getDirections([currentLocation.long, currentLocation.lat], [selectedScooter.longitude, selectedScooter.latitude]);
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
            derectionCoordinate: direction?.routes?.[0]?.geometry.coordinates,
            duration: direction?.routes?.[0]?.duration,
            distance: direction?.routes?.[0]?.distance,
            isNearBy
        }}
        >
            {children}
        </ScooterContext.Provider>
    )
}

export const useScooter = () => useContext(ScooterContext);
