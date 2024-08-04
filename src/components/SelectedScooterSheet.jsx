import { View, Text, Image } from 'react-native'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef } from 'react';
import { useScooter } from '../providers/ScooterProvider';
import scooterImage from '../assets/images/scooter.png';
import Icon from 'react-native-vector-icons/Ionicons';

const SelectedScooterSheet = () => {
    const { selectedScooter } = useScooter();
    const bottomSheetRef = useRef();

    useEffect(() => {
        if (selectedScooter) {
            bottomSheetRef.current?.expand();
        }
    }, [selectedScooter])

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={[200]}
            enablePanDownToClose
            enableDynamicSizing
        >
            <BottomSheetView style={{ flex: 1 }}>
                <Image
                    source={scooterImage}
                    style={{
                        width: 50,
                        objectFit: 'contain'
                    }}
                />
                <Text>Lime - S</Text>
                <Text>XXM - LM8</Text>
                <Icon name="ios-person" size={30} color="#4F8EF7" />
            </BottomSheetView>
        </BottomSheet>
    )
}

export default SelectedScooterSheet