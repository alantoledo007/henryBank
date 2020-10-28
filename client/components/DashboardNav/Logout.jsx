import React from 'react'
import { View, Text } from 'react-native'
import { Button, Container, Label, Logo, hbn } from '../Quantum';

import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth';

export default function Logout({ navigation }) {
    const dispatch = useDispatch();
    return (
        <Container wihtHeader={true}>
            <View style={{ position: 'relative', top: -90}}>
                <Logo size='lg' />
            </View>
            <Label style={hbn('text-center mb-5')} text='¿Realmente desea salir?' />
            <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
                <Button style={{...hbn('col-4')}} label='SI' onPress={() => dispatch(logout())} />
                <Button style={{...hbn('col-4')}} label='NO' onPress={() => navigation.goBack()} />
            </View>
        </Container>
    )
}
