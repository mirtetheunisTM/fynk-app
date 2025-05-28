/* This file is used to define the colors and fonts that are used in the app.
    You can use it by importing it in a component or screen.
    Use colors: theme.colors.darkBlue
    Use fonts: theme.fonts.h1 */

import { StyleSheet } from 'react-native';

const colors = {
    darkBlue: '#1C2133',
    primaryPurple: '#9CB0FF',
    lightPurple: '#C4CFFF',
    pink: "#F5D2FF",
    creme: "#F2F2F2",
    lila: "#ECE7FF",
    neutral: "#FCFCFC",
};

const fonts = StyleSheet.create({
    h1: {
        fontFamily: 'Cabin',
        fontSize: 28,
        fontWeight: '800',
        lineHeight: 1.3,
        letterSpacing: -1,
    },
    h2: {
        fontFamily: 'Cabin',
        fontSize: 24,
        fontWeight: '600',
    },
    h3: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: '800',
    },
    body: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 1.25,
    },
    caption: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 1.25,
    },
    ctaPrim: {
        fontFamily: 'Cabin',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#F2F2F2',
    },
    ctaSec: {
        fontFamily: 'Cabin',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#1C2133',
    }
});

export default{colors, fonts}