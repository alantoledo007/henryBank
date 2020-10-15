import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  } from 'react-native';

import { connect } from 'react-redux';

import {styles as s} from '../style/styleSheet';
import colors from '../style/colors';

const DepositCash = ({ rechargeCode }) => {
    return (
            <View style={styles.container}>
                <Text style={styles.text}>Este código te permitirá depositar dinero en tu cuenta:</Text>
                <View style={styles.codeWrapper}>
                    <Text style={styles.code}>{rechargeCode ? rechargeCode : "00000 00000"}</Text>
                </View>
                <Text style={{...styles.text, fontSize: 15}}>El monto mínimo es de $50.</Text>
                <Text style={styles.text}>Deberás  dirigirte a un Rapipago o Pago Fácil y mostrarle tu código al cajero.</Text>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        // backgroundColor: "green",
        height: 400,
        justifyContent: "space-evenly"
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

})

const mapStateToProps = (state) => {
    return {
      // user: state.auth.user,
      rechargeCode: state.auth.user.rechargeCode,
    };
  };

export default connect(mapStateToProps)(DepositCash);