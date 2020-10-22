import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { Button, Container, Logo } from './Quantum';


export default function Loading() {
    const fadeAnim = useRef(new Animated.Value(0)).current;    
    const fadeAnim2 = useRef(new Animated.Value(0)).current;    

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true
        }).start();
    };

    return (
        <View style={styles.container}>
            <View  >
            <Image source={require("../assets/animacion.gif")} style={{width: 400, height:400 }} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    fadingContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28,
        textAlign: "center",
        margin: 10
    },
    buttonRow: {
        flexDirection: "row",
        marginVertical: 16
    }
});
