//general
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-native';

//UI
import s from './style/styleSheet';
import {Container, Logo, bootnative, QTLink, Button} from './Quantum';

function Home({navigation}) {
    const bn = bootnative();
    const history = useHistory()
    return (
        <Container>
                <View style={bn('row')}>
                    <View style={bn('col-12')}>
                        <Logo />
                    </View>
                </View>

                <View style={bn('row')}>
                    <View style={bn('col-12 p-3 bg-#f1f1f1 borderRadius-5 mt-5')}>
                        <Text style={{ ...bn('text-center text-#999'),...s.size(3.5) }}>
                            Te damos la bienvenida a Quantum, manejar tu plata
                            nunca fue tán facil.
                        </Text>
                    </View>
                </View>

                <View style={bn('row')}>
                    <View style={bn('col-12 my-5')}>
                        <Button to="Login" {...{navigation}} label="iniciar Sesión" />
                    </View>
                    <View style={bn('col-12')}>
                        <Button to="Register" {...{navigation}} style={bn('border-1-primary-solid-5')} color="white" textStyle={bn('text-primary')} label="Crearse una cuenta" />
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