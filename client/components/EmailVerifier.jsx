// este es el verificado de correo electrónico.

//General
import { ScrollView, StyleSheet, StatusBar, View, TouchableOpacity, Text } from 'react-native';
import React,{ useState, useEffect} from 'react';
import {Link} from 'react-router-native';

//UI
import s from './style/styleSheet';


function EmailVerifier(){
    return (
        <ScrollView style={s.container}>
            <View style={{ ...s.mb(5), ...s.col(12)}}>
                <Link to="/" component={TouchableOpacity} style={s.btn('pink')}>
                    <Text style={s.textWhite}>Volver al home</Text>
                </Link>
            </View>
            <Text style={s.textWhite}>hola</Text>
        </ScrollView>
    );
}

export default EmailVerifier;