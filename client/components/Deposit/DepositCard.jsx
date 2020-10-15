import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";

import { styles as s } from "../style/styleSheet";
import colors from "../style/colors";
import { LinearGradient } from 'expo-linear-gradient';


const DepositCard = (props) => {
  const [form, setForm] = useState({
    amount: "",
    cardData: {},
    valid: false,
  });

  const [error, setError] = useState(" ");
  const mostrarError = (err) => {
    setError(err);
    setTimeout(() => {
      setError(" ");
    }, 5000);
  };

  const onChange = (inputData) => {
    setForm({
      ...form,
      cardData: inputData.values,
      valid: inputData.valid,
    });
  };

  const onSubmit = () => {
      if(parseInt(form.amount) < 50) return mostrarError("El monto mínimo es de $50.")
    if (form.valid) return console.log("Submiteado con exito");
    mostrarError("Datos de tarjeta no válidos.");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          // Background Linear Gradient
          colors={[colors.blue, "#6b538a"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
          
        />
        <View style={styles.amountInputWrapper}>
          <Text style={styles.text}>Monto de la recarga:</Text>
          <TextInput
            //monto de la recarga
            style={styles.amountInput}
            onChangeText={(value) =>
              setForm({
                ...form,
                amount: value,
              })
            }
            textContentType="number"
            keyboardType="number-pad"
          />
          <Text style={{ ...styles.text, fontSize: 15 }}>
            El monto mínimo es de $50.
          </Text>
        </View>
        <View style={styles.cardInputWrapper}>
          <Text style={{ ...styles.text }}>Datos de tu tarjeta:</Text>
          <View style={{}}>
            <CreditCardInput
              // inputStyle={styles.input}
              onChange={onChange}
              cardScale={0.7}
              labelStyle={{...styles.text, ...styles.cardInputLabel}}
              labels={{
                number: "NÚMERO DE TARJETA",
                expiry: "EXPIRACIÓN",
                cvc: "CVC",
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.submitWrapper}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.confirmButton} onPress={onSubmit}>
          <Text style={{ ...styles.text, ...styles.confirmButtonText }}>
            CONFIRMAR
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "yellow",
    height: 400,
    justifyContent: "space-evenly",
  },
  text: {
    ...s.font,
    textAlign: "center",
    ...s.size(4.5),
    ...s.textColor("white"),
  },
  scrollView: {
    backgroundColor: "#6b538a",
    borderRadius: 15,
    //   paddingVertical: 7
  },
  amountInputWrapper: {
    marginBottom: 80,
  },
  amountInput: {
    ...s.input,
    width: 80,
    alignSelf: "center",
    fontSize: 20,
  },
  input: {
    ...s.input,
    margin: 7,
    fontSize: 20,
  },
  cardInputWrapper: {
    //   backgroundColor: "orange",
    height: 200,
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  cardInputLabel: {
    ...s.font,
    ...s.textColor("white"),
    paddingTop: 10,
    fontSize: 10
  },
  submitWrapper: {
    paddingTop: 35,
  },
  error: {
    color: colors.pink,
    ...s.font,
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  confirmButton: {
    ...s.btn(),
    width: 280,
    height: 75,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  confirmButtonText: {
    fontSize: 35,
    fontWeight: "800"
  },
});

export default DepositCard;
