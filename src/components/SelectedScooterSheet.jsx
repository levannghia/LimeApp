import { View, Text, Image, Alert } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { useScooter } from '../providers/ScooterProvider';
import scooterImage from '../assets/images/scooter.png';
import { Button } from './Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const SelectedScooterSheet = () => {
    const { selectedScooter, distance, duration, setSelectedScooter, isNearBy } = useScooter();
    const { userId } = useAuth();
    const navigation = useNavigation();
    const bottomSheetRef = useRef();
    const [ride, setRide] = useState(null);

    useEffect(() => {
        if (selectedScooter) {
            bottomSheetRef.current?.expand();
        } else {
            bottomSheetRef.current?.close();
        }
    }, [selectedScooter]);

    const startRide = async (scooterId) => {
        if (ride) {
            Alert.alert('Cannot start a new ride while another one is in progress');
            return;
        }
        const { data, error } = await supabase
            .from('rides')
            .insert([
                {
                    user_id: userId,
                    scooter_id: scooterId,
                },
            ])
            .select();
        if (error) {
            Alert.alert('Failed to start the ride');
            console.log(error);
        } else {
            setRide(data[0]);
        }
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={[200]}
            enablePanDownToClose
            onClose={() => setSelectedScooter(undefined)}
            backgroundStyle={{ backgroundColor: '#414442' }}
        // enableDynamicSizing
        >
            {selectedScooter && (
                <BottomSheetView style={{
                    flex: 1,
                    padding: 10,
                    gap: 20
                }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image
                            source={scooterImage}
                            style={{
                                width: 60,
                                height: 60,
                            }}
                            resizeMode='contain'
                        />
                        <View style={{
                            flex: 1,
                            gap: 5
                        }}
                        >
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: '600' }}>Lime - S</Text>
                            <Text style={{ color: 'gray', fontSize: 16 }}>ID-{selectedScooter?.id} * Madison Avenue</Text>
                        </View>
                        <View style={{ gap: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start' }}>
                                <Icon name="highlighter" size={18} color="#42E100" />
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{(distance / 1000).toFixed(1)} km</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start' }}>
                                <Icon name="clock" size={18} color="#42E100" />
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{(duration / 60).toFixed(0)} min</Text>
                            </View>
                        </View>
                    </View>
                    {/* Bottom part */}
                    <View>
                        <Button
                            title="Start journey"
                            disabled={!isNearBy}
                            onPress={() => {
                                startRide(selectedScooter.id);
                                setSelectedScooter(undefined);
                            }}
                        />
                    </View>
                </BottomSheetView>
            )}
        </BottomSheet>
    )
}

export default SelectedScooterSheet