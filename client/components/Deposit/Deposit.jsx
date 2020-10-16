import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Link } from "react-router-native";

import colors from "../style/colors";
import { styles as s } from "../style/styleSheet";
import { LinearGradient } from "expo-linear-gradient";

import { Picker, PickerIOS } from "@react-native-community/picker";
// import RNPickerSelect from "react-native-picker-select";
import DepositCash from "./DepositCash";
import DepositCard from "./DepositCard";

const Deposit = () => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.8)", "#6b538a"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 50,
          height: 1000,
        }}
      />

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
    backgroundColor: "black"
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
    width: 110,
    alignSelf: "center",
    color: colors.white,
    // fontSize: 200000,
    // textAlign: "center",
  },
  needHelp: {
    ...s.font,
    color: colors.orange,
    marginTop: 30,
  },
});

export default Deposit;
