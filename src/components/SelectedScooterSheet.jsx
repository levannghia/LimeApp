import { View, Text, Image } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { useScooter } from '../providers/ScooterProvider';
import scooterImage from '../assets/images/scooter.png';
import { Button } from './Button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const SelectedScooterSheet = () => {
    const { selectedScooter, distance, duration, setSelectedScooter, isNearBy } = useScooter();
    const navigation = useNavigation();
    const bottomSheetRef = useRef();

    useEffect(() => {
        if (selectedScooter) {
          bottomSheetRef.current?.expand();
        } else {
          bottomSheetRef.current?.close();
        }
      }, [selectedScooter]);

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
                                objectFit: 'contain',
                            }}
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
                            disabled={isNearBy}
                            onPress={() => navigation.navigate('Login')}
                        // onPress={() => {
                        //     startRide(selectedScooter.id);
                        //     setSelectedScooter(undefined);
                        // }}
                        />
                    </View>
                </BottomSheetView>
            )}
        </BottomSheet>
    )
}

export default SelectedScooterSheet