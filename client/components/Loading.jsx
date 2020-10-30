import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Image } from 'react-native';
import { Button, Container, Logo } from './Quantum';


export default function Loading() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require("../assets/GIF-Spinner.gif")} 
                style={{ height: 75, width: 338, zIndex: 1000 }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#221F3B'
    },
});
