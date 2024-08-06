import { View, Text, ScrollView, ImageBackground, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../styles/globalStyles';

const ContainerComponent = ({ isScroll, isImageBackground, children, back, right, styles }) => {

    const returnContainer = isScroll ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>{children}</ScrollView>
    ) : (
        <View style={{ flex: 1 }}>{children}</View>
    )

    const headerComponent = () => {
        return (
            <View style={[{flex: 1}, globalStyles.page, styles]}>
                {returnContainer}
            </View>
        )
    }
    return isImageBackground ? (
        <ImageBackground
            source={require('../assets/images/splash-image.png')}
            style={{
                flex: 1
            }}
        >
            {headerComponent()}
        </ImageBackground>
    ) : (
        <SafeAreaView style={[styles, { flex: 1 }]}>
            {headerComponent()}
        </SafeAreaView>
    )
}

export default ContainerComponent