import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';

import colors from './style/colors';
import {styles as s} from './style/styleSheet';

const Deposit = ({rechargeCode}) => {
    return(
    <View style={styles.container}>
        <Text style={{...styles.text, fontSize: 40}}>Recargar dinero</Text>
        <View>
            <Text style={styles.text}>Este código te permitirá depositar dinero en tu cuenta:</Text>
            <View style={styles.codeWrapper}>
                <Text style={styles.code}>{rechargeCode ? rechargeCode : "00000 00000"}</Text>
            </View>
            <Text style={{...styles.text, fontSize: 15}}>El monto mínimo es de $50.</Text>
        </View>
        <Text style={styles.text}>Deberás mostrárselo al cajero de Rapipago o Pago Fácil.</Text>
        <Link style={styles.volver} component={TouchableOpacity} to="/dash">
            <Text style={{...s.textButton(colors.white), ...s.font}}>VOLVER</Text>
        </Link>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...s.container,
        ...s.itemsCenter,
        justifyContent: "space-around"
    },
    text: {
        ...s.font,
        textAlign: "center",
        ...s.size(4.5),
        ...s.textColor("white")
    },
    codeWrapper: {
        ...s.btn(),
        width: 300,
        height: 80,
        paddingTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    code: {
        ...s.font,
        color: colors.white,
        fontSize: 45
    },
    volver: {
        ...s.btn(),
        width: 70,
        height: 30,
        justifyContent: "center"
    }
})

const mapStateToProps = state => {
    return {
        // user: state.auth.user,
        rechargeCode: state.auth.user.rechargeCode
    }
}

export default connect(mapStateToProps, null)(Deposit);