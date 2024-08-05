import { createContext, useContext, useEffect, useState } from "react";
import Geolocation from '@react-native-community/geolocation'
import { getDirections } from '../services/directions'

const ScooterContext = createContext({});

export default function ScooterProvider({ children }) {
    const [currentLocation, setCurrentLocation] = useState({});
    const [selectedScooter, setSelectedScooter] = useState();
    const [direction, setDirection] = useState(null);
    const [isNearBy, setIsNearBy] = useState(false);

    // useEffect(() => {
    //     const fetchDirection = async () => {
    //         Geolocation.getCurrentPosition(async (position) => {
    //             if (position.coords) {
    //                 const location = {
    //                     lat: position.coords.latitude,
    //                     long: position.coords.longitude,
    //                 };
    //                 setCurrentLocation(location);

    //                 if (selectedScooter) {
    //                     console.log(location)
    //                     console.log(selectedScooter)
    //                     await getDirections([location.long, location.lat], [selectedScooter.lat, selectedScooter.long])
    //                         .then(newDirection => setDirection(newDirection));
    //                 }
    //             }
    //         })
    //         // console.log(currentLocation)
    //         // console.log(selectedScooter)
    //         // const newDirection = await getDirections([currentLocation.long, currentLocation.lat], [selectedScooter.lat, selectedScooter.long]);
    //         // setDirection(newDirection);

    //     }

    //     if (selectedScooter) {
    //         fetchDirection();
    //     }
    // }, [selectedScooter]);

    useEffect(() => {
        const fetchCurrentLocation = () => {
            Geolocation.getCurrentPosition((position) => {
                if (position.coords) {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        long: position.coords.longitude,
                    });
                }
            });
        };

        fetchCurrentLocation();
    }, []);

    useEffect(() => {
        const fetchDirection = async () => {
            if (selectedScooter && currentLocation.lat && currentLocation.long) {
                const newDirection = await getDirections(
                    [currentLocation.long, currentLocation.lat],
                    [selectedScooter.long, selectedScooter.lat]
                );
                setDirection(newDirection);
            }
        };

        fetchDirection();
    }, [selectedScooter, currentLocation]);

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
