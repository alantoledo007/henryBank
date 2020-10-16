import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";

import { connect } from "react-redux";
import axios from "axios";
import env from "../../env";

import { styles as s } from "../style/styleSheet";
import colors from "../style/colors";

const DepositCard = ({ token }) => {
  const history = useHistory();
  const [form, setForm] = useState({
    amount: "",
    values: {},
    validations: {
      valid: false,
      status: {
        number: "",
        expiry: "",
        cvc: "",
      },
    },
  });

  const [showModal, setShowModal] = useState(false);
  const hiddenInfo = () => {
    const splitName = form.values.name
      ? form.values.name.toUpperCase().split(" ")
      : null;
    const lastPart = splitName ? splitName[splitName.length - 1] : null;
    return {
      number: form.values.number
        ? "************" + String(form.values.number).substring(15)
        : null,
      name: lastPart ? "*********** " + lastPart : null,
    };
  };

  const [error, setError] = useState(" ");
  const mostrarError = (err) => {
    setError(err);
    setTimeout(() => {
      setError(" ");
    }, 5000);
  };

  const onChange = (cardInput) => {
    setForm({
      ...form,
      values: cardInput.values,
      validations: {
        valid: cardInput.valid,
        status: {
          ...cardInput.status,
        },
      },
    });
  };

  const onSubmit = () => {
    //Función para formular algunos errores de manera un poco mas prolija, ya que el paquete de la tarjeta está en inglés
    const getErrorMsg = (input) => {
      switch (input) {
        case "number":
          return "Número de tarjeta inválido.";
        case "expiry":
          return "Fecha de expiración inválida.";
        case "cvc":
          return "Código de seguridad inválido.";
        case "name":
          return "Nombre en tarjeta inválido.";
      }
    };
    if (
      form.amount === "" ||
      form.values.number === "" ||
      form.values.expiry === "" ||
      form.values.cvc === "" ||
      form.values.name === ""
    )
      return mostrarError("Por favor ingresa todos los datos.");

    //Chequeo el monto de recarga
    if (form.amount === "" || parseInt(form.amount) < 100)
      return mostrarError("El monto mínimo es de $100.");
    //Chequeo las validaciones del CardInput
    if (!form.validations.valid) {
      const inputStatus = form.validations.status;
      for (let input in inputStatus) {
        if (inputStatus[input] != "valid") {
          return mostrarError(getErrorMsg(input));
        }
      }
    }
    //Si no hubo ningún error, hago el llamado a API
    const { number, cvc, expiry, name } = form.values;
    axios
      .post(
        `${env.API_URI}/recharge/card`,
        {
          amount: parseInt(form.amount),
          card_number: number.split(" ").join(""),
          card_cvv: cvc,
          card_expiration_date: expiry,
          holder_name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setShowModal(true);
      })
      .catch((err) =>
        console.log("ERROR en DepositCard al recargar dinero con tarjeta", err)
      );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
            El monto mínimo es de $100.
          </Text>
        </View>
        <View style={styles.cardInputWrapper}>
          <Text style={{ ...styles.text }}>Datos de tu tarjeta:</Text>
          <CreditCardInput
            requiresName={true}
            onChange={onChange}
            cardScale={0.7}
            labelStyle={{ ...styles.text, ...styles.cardInputLabel }}
            labels={{
              number: "NÚMERO DE TARJETA",
              expiry: "EXPIRACIÓN",
              cvc: "CVC",
              name: "NOMBRE",
            }}
          />
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

      {/* MODAL DE RECARGA CON ÉXITO */}
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{ ...styles.text, ...styles.successText, fontSize: 30 }}
            >
              ¡Recarga exitosa!
            </Text>
            <Text style={{ ...styles.text, ...styles.successText }}>
              Cargaste{" "}
              <Text
                style={{
                  ...styles.text,
                  ...styles.successText,
                  color: colors.orange,
                }}
              >
                ${form.amount}
              </Text>{" "}
              a tu cuenta.
            </Text>
            <Text style={{ ...styles.text, ...styles.successText }}>
              Información del pago:{"\n"}
              <Text
                style={{
                  ...styles.text,
                  ...styles.successText,
                  color: colors.orange,
                }}
              >
                {/* Número de tarjeta parcialmente oculto */}
                {hiddenInfo().number}
              </Text>
              {"\n"}
              <Text
                style={{
                  ...styles.text,
                  ...styles.successText,
                  color: colors.orange,
                }}
              >
                {hiddenInfo().name}
              </Text>
            </Text>

            <Link to="/dash" component={TouchableOpacity} style={styles.successButton}>
              <Text style={{ ...styles.text }}>Volver</Text>
            </Link>
          </View>
        </View>
      </Modal>
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
    width: 400,
    // backgroundColor: "#6b538a",
    paddingHorizontal: 15,
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
    height: 250,
  },
  cardInputLabel: {
    ...s.font,
    ...s.textColor("white"),
    paddingTop: 10,
    fontSize: 15,
  },
  submitWrapper: {
    paddingTop: 15,
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
    fontWeight: "800",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successText: {
    color: colors.pink,
  },
  successButton: {
    ...s.btn(),
    height: 40,
    width: 80,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(DepositCard);
