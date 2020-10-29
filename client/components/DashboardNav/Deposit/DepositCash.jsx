import React, { useState } from "react";
import {
  View,
  StyleSheet,
} from "react-native";

import { connect } from "react-redux";

// import QRCode from "qrcode.react";
import QRCode from "react-qr-code";

import { styles as s } from "../../style/styleSheet";
import colors from "../../style/colors";

import { Container, Label, Button, QTLink } from "../../Quantum";

const DepositCash = ({ recharge_code }) => {
  return (
   <View style={{paddingTop: 15}}>
      <Label
        style={{ textAlign: "center" }}
        text="Este código te permitirá depositar dinero en tu cuenta pagando con efectivo:"
      />
      <View>
        {/* <Button label={splitRechargeCode} disabled={true} style={{alignSelf: "center", width: 300}} textStyle={{fontSize: 50}}/> */}
        <View
          style={{
            alignSelf: "center",
            width: 290,
            height: 290,
            paddingVertical: 15,
            backgroundColor: colors.pink,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode
            value={JSON.stringify({
              recharge_code,
            })}
          />
        </View>
        <Label
          style={{ fontSize: 15, alignSelf: "center" }}
          text="El monto mínimo es de $100."
        />
      </View>
      <Label
        style={{ textAlign: "center" }}
        text="¡Es fácil! Sólo deberás  dirigirte a un Rapipago o Pago Fácil y mostrarle tu código al cajero."
      />
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
    width: 270,
    height: 80,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  code: {
    ...s.font,
    color: colors.white,
    fontSize: 35,
  },
});

const mapStateToProps = (state) => {
  return {
    recharge_code: state.auth.user.recharge_code,
  };
};

export default connect(mapStateToProps)(DepositCash);
