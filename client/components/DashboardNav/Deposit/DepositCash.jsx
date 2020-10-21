import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { connect } from "react-redux";

import { styles as s } from "../../style/styleSheet";
import colors from "../../style/colors";

import { Container, Label, Button, QTLink } from "../../Quantum";

const DepositCash = ({ recharge_code }) => {
  //Ya que el código de recarga es un poquito largo, lo separo a la mitad levemente para que sea un poco mas facil de leer
  const splitRechargeCode = recharge_code
    ? recharge_code.toString().substring(0, 5) +
      "  " +
      recharge_code.toString().substring(5)
    : "00000 00000";
  return (
    <View style={styles.container}>
      <Label style={{textAlign: "center"}} text="Este código te permitirá depositar dinero en tu cuenta pagando con efectivo:" />
      <View>
        <View style={styles.codeWrapper}>
          <Text style={styles.code}>
            {splitRechargeCode}
          </Text>
        </View>
        <Label style={{fontSize: 15, alignSelf: "center"}} text="El monto mínimo es de $100." />
      </View>
      <Label style={{textAlign: "center"}} text="¡Es fácil! Sólo deberás  dirigirte a un Rapipago o Pago Fácil y mostrarle tu código al cajero." />
    </View>
  );
};
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
    ...s.textColor("white"),
  },
  codeWrapper: {
    ...s.btn(),
    width: 300,
    height: 80,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  code: {
    ...s.font,
    color: colors.white,
    fontSize: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    recharge_code: state.auth.user.recharge_code,
  };
};

export default connect(mapStateToProps)(DepositCash);
