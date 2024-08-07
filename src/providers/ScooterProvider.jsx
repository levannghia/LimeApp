import { createContext, useContext, useEffect, useState } from "react";
import Geolocation from '@react-native-community/geolocation'
import { getDirections } from '../services/directions'
import { Alert } from "react-native";
import { supabase } from "../lib/supabase";

const ScooterContext = createContext({});

export default function ScooterProvider({ children }) {
    const [nearbyScooters, setNearbyScooters] = useState([]);
    const [currentLocation, setCurrentLocation] = useState({});
    const [selectedScooter, setSelectedScooter] = useState();
    const [direction, setDirection] = useState(null);
    const [isNearBy, setIsNearBy] = useState(false);
    const [position, setPosition] = useState(null);
    const [subscriptionId, setSubscriptionId] = useState(null);

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
        const fetchScooters = async () => {
            if (currentLocation.lat && currentLocation.long) {
                const { error, data } = await supabase.rpc('nearby_scooters', {
                    lat: currentLocation.lat,
                    long: currentLocation.long,
                    max_dist_meters: 6000,
                });
    
                if (error) {
                    console.log('Error:', JSON.stringify(error, null, 2));
                    Alert.alert('Failed to fetch scooters');
                } else {
                    console.log('Scooters data:', JSON.stringify(data, null, 2));
                    setNearbyScooters(data);
                }
            }
        };
    
        fetchScooters();
    }, [currentLocation]);

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

    useEffect(() => {
        return () => {
            clearWatch();
        };
    }, []);

    const watchPosition = () => {
        try {
            const watchID = Geolocation.watchPosition(
                (position) => {
                    console.log('watchPosition', JSON.stringify(position));
                    setPosition(JSON.stringify(position));
                },
                (error) => Alert.alert('WatchPosition Error', JSON.stringify(error)),
                {
                    interval: 10000
                }
            );
            setSubscriptionId(watchID);
        } catch (error) {
            Alert.alert('WatchPosition Error', JSON.stringify(error));
        }
    };

    const clearWatch = () => {
        subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
        setSubscriptionId(null);
        setPosition(null);
    };


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
