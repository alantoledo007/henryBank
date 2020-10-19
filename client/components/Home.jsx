//general
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-native';

//UI
import s from './style/styleSheet';
import {Container, Logo, bootnative, QTLink, Button, Alert} from './Quantum';

function Home({navigation}) {
    const bn = bootnative();
    return (
        <Container>
            <View style={bn('row')}>
                <View style={bn('col-12')}>
                    <Logo />
                </View>
            </View>

            <Alert content="Te damos la bienvenida a Quantum, manejar tu plata nunca fue tán facil."/>

            <View style={bn('row')}>
                <View style={bn('col-12 my-5')}>
                    <Button to="Login" {...{navigation}} label="iniciar Sesión" />
                </View>
                <View style={bn('col-12')}>
                    <Button to="Register" {...{navigation}} outline="primary" color="transparent" label="Crearse una cuenta" />
                </View>
                <View style={bn('col-12 mt-5')}>
                    <QTLink to="Login" {...{navigation}} label="¿Necesitas ayuda?"/>
                </View>
                
                
                {/* Prueba */}
                <View style={bn('col-12 my-5')}>
                    <Button to="Graphics" {...{navigation}} label="Estadistica" />
                </View>



            </View>
        </Container>
    );
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);