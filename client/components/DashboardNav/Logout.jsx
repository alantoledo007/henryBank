import React from 'react'
import { View, Text } from 'react-native'
import { Button, Container, Label } from '../Quantum';

import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth';

export default function Logout({ navigation }) {
    const dispatch = useDispatch();
    return (
        <Container>
            <Label text='¿Realmente desea salir?' />
            <View>
                <Button label='SI' onPress={ () => dispatch(logout()) } />
                <Button label='NO' onPress={ () => navigation.goBack()} />
            </View>
        </Container>
    )
}
