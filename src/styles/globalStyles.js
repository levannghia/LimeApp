import { Platform, StatusBar, StyleSheet } from "react-native";
import { appColors } from "../constants/appColors";

const statusBarHeight = StatusBar.currentHeight;

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.white,
    },
    page: {
        paddingTop: Platform.OS === 'android' ? statusBarHeight : 0
    },
    row: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
})