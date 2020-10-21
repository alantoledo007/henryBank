import React from 'react'
import { View, Text } from 'react-native'
import { Button, Container, Label } from '../Quantum'

export default function Logout({ navigation }) {
    return (
        <Container>
            <Label text='¿Realmente desea salir?' />
            <View>
                <Button label='SI' onPress={ () => navigation.navigate('Salir')} />
                <Button label='NO' onPress={ () => navigation.goBack()} />
            </View>
        </Container>
    )
}
