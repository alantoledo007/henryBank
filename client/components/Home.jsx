//general
import React from 'react';
import { View} from 'react-native';
import { connect } from 'react-redux';

//UI
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