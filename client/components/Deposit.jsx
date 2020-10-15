import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Link } from "react-router-native";
import { connect } from "react-redux";

import colors from "./style/colors";
import { styles as s } from "./style/styleSheet";

import { Picker, PickerIOS } from "@react-native-community/picker";
// import RNPickerSelect from "react-native-picker-select";
import DepositCash from "./Deposit/DepositCash";
import DepositCard from "./Deposit/DepositCard";

const Deposit = ({ rechargeCode }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <View style={styles.container}>
      <Link style={styles.volver} component={TouchableOpacity} to="/dash">
        <Text style={{ ...s.textButton(colors.white), ...s.font }}>VOLVER</Text>
      </Link>
      <View style={styles.pickerWrapper}>
        <Text style={{ ...styles.text, fontSize: 40 }}>Recargar dinero</Text>
        <Picker
          style={styles.picker}
          itemStyle={{ ...styles.text, color: "green" }}
          selectedValue={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value)}
          mode="dropdown"
        >
          <Picker.Item label="Efectivo" value="cash"></Picker.Item>
          <Picker.Item label="Tarjeta" value="card"></Picker.Item>
        </Picker>
      </View>
      {/* Según el state paymentMethod, renderizamos un componente u otro: */}
      {paymentMethod === "cash" && <DepositCash />}
      {paymentMethod === "card" && <DepositCard />}
      <Link>
        <Text style={styles.needHelp}>¿Necesitas ayuda?</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...s.container,
    ...s.itemsCenter,
    // justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    ...s.font,
    textAlign: "center",
    ...s.size(4.5),
    ...s.textColor("white"),
  },
  volver: {
    ...s.btn(),
    width: 70,
    height: 30,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  pickerWrapper: {
    // backgroundColor: "red",
  },
  picker: {
    height: 30,
    width: 100,
    alignSelf: "center",
    color: colors.orange,
    fontSize: 200,
    textAlign: "center",
    // backgroundColor: "blue",
  },
  needHelp: {
    ...s.font,
    color: colors.orange,
    marginTop: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    // user: state.auth.user,
    rechargeCode: state.auth.user.rechargeCode,
  };
};

export default connect(mapStateToProps, null)(Deposit);
