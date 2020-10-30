import React, { useState, useEffect } from "react";
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
import { Container, Label } from "../../Quantum";

//UI
import { TabBar, TabView, Tab, Modal, Select, SelectItem, IndexPath, Input, Card, Icon, Layout, Text as KText, Button } from '@ui-kitten/components';

const Deposit = ({ closeModal, navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState("QRCode");
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const methods = [
    "qr",
    "card"
  ]

  // useEffect(()=>{
  //   console.log(selectedIndex);
  // },[selectedIndex]);


  //armé esta función por si se puede llegar a este componente desde el modal en Dash Y otra manera que involucre react navigation
  //Maneja los dos casos para salir del componente
  const close = () => {
    //Si hay navigation, es decir, si se navegó a este componente mediante el menú, usamos navigate
    if (navigation) {
      return navigation.navigate("Dashboard");
    }
    //Si no, es decir, si se está viendo el componente a través de modal, cerramos el modal
    closeModal();
  };

  return (
    <Layout>
      <View style={styles.pickerWrapper}>

        <Select
          placeholder='Default'
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}>
          <SelectItem title='QR'/>
          <SelectItem title='Tarjeta'/>
        </Select>

        {/* <View style={{ ...s.input, justifyContent: "center", width: 200, alignSelf: "center" }}>
          <Picker
            style={styles.picker}
            // itemStyle={{ ...styles.text, color: "green" }}
            selectedValue={paymentMethod}
            onValueChange={(value) => setPaymentMethod(value)}
            mode="dropdown"
          >
            <Picker.Item label="Código QR" value="QRCode"></Picker.Item>
            <Picker.Item label="Tarjeta" value="card"></Picker.Item>
          </Picker>
        </View> */}
      </View>
      {/* Según el state paymentMethod, renderizamos un componente u otro: */}
      {methods[selectedIndex.row] === "qr" && <DepositCash />}
      {methods[selectedIndex.row] === "card" && (
        <DepositCard close={close} navigation={navigation} />
      )}

      {/* {navigation ? 
        <QTLink label="¿Necesitás ayuda?" {...{ navigation }} to="Dash" />
      : 
        <Label style={styles.needHelp}text="¿Necesitás ayuda?" onPress={close} />
      } */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-between",
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
    width: 200,
    alignSelf: "center",
    color: "black",
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
