import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import { connect } from "react-redux";

import colors from "../../style/colors";
import { styles as s } from "../../style/styleSheet";
import { LinearGradient } from "expo-linear-gradient";

import { Picker, PickerIOS } from "@react-native-community/picker";
// import RNPickerSelect from "react-native-picker-select";

//Sub-components
import DepositCash from "./DepositCash";
import DepositCard from "./DepositCard";
import { Container, Label, Button, QTLink } from "../../Quantum";

const Deposit = ({ closeModal, navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  //armé esta función por si se puede llegar a este componente desde el modal en Dash Y otra manera que involucre react navigation
  //Maneja los dos casos para salir del componente
  const close = () => {
    //Si hay navigation, es decir, si se navegó a este componente mediante el menú, usamos navigate
    if(navigation){
      return navigation.navigate("Dashboard")
    }
    //Si no, es decir, si se está viendo el componente a través de modal, cerramos el modal
    closeModal();
  }

  return (
    <Container style={styles.container}  >
      {/* <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.8)", "#6b538a"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 50,
          height: 1000,
        }}
      /> */}

      <View style={{ marginBottom: 15, alignSelf: "flex-end" }}>
        {closeModal && (
          <TouchableWithoutFeedback onPress={close}>
            <Image
              style={{ height: 15 }}
              source={require("../../../assets/close-pink.png")}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <View style={styles.pickerWrapper}>
        <Label
          text="Recargar dinero"
          style={{ fontSize: 40, alignSelf: "center" }}
        />
        <Picker
          style={styles.picker}
          // itemStyle={{ ...styles.text, color: "green" }}
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
      {paymentMethod === "card" && <DepositCard close={close} navigation={navigation} />}

      {/* {navigation ? 
        <QTLink label="¿Necesitás ayuda?" {...{ navigation }} to="Dash" />
      : 
        <Label style={styles.needHelp}text="¿Necesitás ayuda?" onPress={close} />
      } */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between"
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
    color: colors.pink,
    // fontSize: 200000,
    // textAlign: "center",
  },
  needHelp: {
    ...s.font,
    color: colors.pink,
    fontSize: 15,
    alignSelf: "center",
    // marginBottom: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    recharge_code: state.auth.user.recharge_code,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(Deposit);
