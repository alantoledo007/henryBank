import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,  } from 'react-native';

import {styles as s} from '../style/styleSheet';
import colors from '../style/colors';

const DepositCash = ({ recharge_code }) => {
    //Ya que el código de recarga es un poquito largo, lo separo a la mitad levemente para que sea un poco mas facil de leer
    const splitRechargeCode = recharge_code.toString().substring(0, 5) + "  " + recharge_code.toString().substring(5)
    return (
            <View style={styles.container}>
                <Text style={styles.text}>Este código te permitirá depositar dinero en tu cuenta pagando con efectivo:</Text>
                <View style={styles.codeWrapper}>
                    <Text style={styles.code}>{recharge_code ? splitRechargeCode : "00000 00000"}</Text>
                </View>
                <Text style={{...styles.text, fontSize: 15}}>El monto mínimo es de $100.</Text>
                <Text style={styles.text}>¡Es fácil! Sólo deberás  dirigirte a un Rapipago o Pago Fácil y mostrarle tu código al cajero.</Text>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 400,
        justifyContent: "space-evenly",
        // marginVertical: 15,
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


export default DepositCash;