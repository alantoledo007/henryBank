import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ScreenContainer = ({ children }) => (
    <View style={styles.container}>{children}</View>
);
export const Splash = () => (
    <ScreenContainer>
        <Text>Loading...</Text>
    </ScreenContainer>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        borderRadius: 5
    }
});