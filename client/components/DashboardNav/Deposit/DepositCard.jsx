import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";

//Redux
import { connect } from "react-redux";
import {
  getTransactions,
  updateBalance,
} from "../../../redux/actions/transactions";

import axios from "axios";
import env from "../../../env";

//UI
import colors from "../../style/colors";
import {
  Label,
  bn
} from "../../Quantum";
import Toast from "react-native-toast-message";

import { TabBar, TabView, Tab, Modal, Select, SelectItem, IndexPath, Input, Card, Icon, Layout, Text as KText, Button } from '@ui-kitten/components';
import { useColorScheme } from "react-native-appearance";
import CreditCardDisplay from "react-native-credit-card-display";


const DepositCard = ({ token, close, updateBalance }) => {
  const [dis, setDis] = useState(false);
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
    //Función auxiliar para formular algunos errores de manera un poco mas prolija, ya que el paquete de la tarjeta está en inglés
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
    if (form.values.name.split(" ").length === 1) {
      return mostrarError("Nombre en tarjeta inválido.");
    }
    //Si no hubo ningún error, hago el llamado a API
    setError("")
    setDis(true);
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
      .then((res) => {
        setDis(false);
        // setForm({});
        updateBalance(res.data.balance);
        // getTransactions(token);
        close();
        Toast.show({
          type: "success",
          text1: `¡Cargaste $${form.amount} a tu cuenta!`,
          text2: `Información de la tarjeta:
          \n${hiddenInfo().number}
          \n${hiddenInfo().name}
          \nPuede consultar más información en la sección Movimientos.`,
        });
      })
      .catch((err) => {
        setDis(false);
        console.log("ERROR en DepositCard al recargar dinero con tarjeta", err);
      });
  };

  const theme = useColorScheme(); 

  return (
    <View>
        <Input
          label="Monto, mínimo $100 ARS"
          keyboardType="number-pad"
          placeholder="00.00"
          onChangeText={(value) =>
            setForm({
              ...form,
              amount: value,
            })
          }
        />
      <View style={bn('my-3')}>
        <CreditCardInput
          cardImageFront={require("../../../assets/Frente.png")}
          cardImageBack={require("../../../assets/Dorso.png")}
          validColor={theme === 'dark' ? '#fff' : '#000'}
          requiresName={true}
          onChange={onChange}
          allowScroll={true}
          labelStyle={{ color: theme === 'dark' ? '#ccc' : '#aaa', fontSize: 13 }}
          placeholders={{
            name:'Como figura en la tarjetas'
          }}
          labels={{
            number: "NÚMERO DE TARJETA",
            expiry: "VENC.",
            cvc: "CVC",
            name: "NOMBRE COMPLETO",
          }}
          // inputContainerStyle={{flexDirection: "column"}}
        />

      </View>

      <View style={{}}>
        {dis && (
          <ActivityIndicator animating={dis} size="large" color={colors.pink} />
        )}
        {error ? <Label text={error} /> : null}
        <Button
          disabled={dis}
          onPress={onSubmit}
        >
          Confirmar
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (token) => dispatch(getTransactions(token)),
    updateBalance: (balance) => dispatch(updateBalance(balance)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositCard);
