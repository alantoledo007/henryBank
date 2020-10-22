//general
import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../env";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Picker,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import validator from "email-validator";
import {updateBalance} from '../../redux/actions/transactions';

//redux
import { connect } from "react-redux";

//UI
import s from "../style/styleSheet";
import { Container, Label, Input, Alert, toastConfig } from "../Quantum";
import Toast from 'react-native-toast-message';

const SendMoney = (props) => {
  const { token, balance, close, navigation, updateBalance } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Contactos");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [money, setMoney] = useState(0);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [friends, setFriends] = useState([]);
  const [flag, setFlag] = useState(false);
  const [find, setFind] = useState(false);
  const [invite, setInvite] = useState("");

  const contancts = () => {
    axios
      .get(`${env.API_URI}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.data.length === 0) {
          setSelectedValue("Sin contactos");
          setFlag(true);
        }
        setFriends(response.data.data);
        setFlag(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const [error, setError] = useState("");
  const mostrarError = (err) => {
    setError(err);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  function next() {
    if (
      selectedValue === "Contactos" ||
      selectedValue === "Sin contactos" ||
      selectedValue === "Enviar sin agendar"
    ) {
      return mostrarError("Debe ingresar un contacto");
    }
    if (find === true) {
      if (validator.validate(selectedValue) === false) {
        return mostrarError("No es un email valido");
      }
    }
    if (toggleCheckBox === false) {
      return mostrarError("Debe aceptar los terminos");
    }
    if (money === 0 || money === null || money === undefined) {
      return mostrarError("Debe ingresar el valor de la transferencia");
    }
    if (money < 100) {
      return mostrarError("Transferencia minima de 100 pesos");
    }
    if (isNaN(money)) {
      return mostrarError("El valor debe ser un número");
    }

    const payload = {
      amount: money,
      description: description,
      identifier: selectedValue,
    };

    axios
      .post(`${env.API_URI}/transactions/newtransaction`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        updateBalance(response.data.balance);
        return await Toast.show({
          type: "success",
          text1: "Transeferencia completa",
          text2: response.data.title,
        });
      })
      .catch((error) => {
        if (error.message.includes("409")) {
          setTitleError("Dinero insuficiente");
        }
        if (error.message.includes("402")) {
          setTitleError("Destino incorrecto");
        }
        if (error.message.includes("500")) {
          setTitleError("No es un usuario de Quantum");
          setInvite(true);
        }
        setModalVisible(true);
      });
  }
  useEffect(() => {
    flag === false ? contancts() : {};
  });

  const back = () => {
    setFind(false), setSelectedValue("Contactos");
  };

  return (
    <Container>
      <View style={{ marginBottom: 15, alignSelf: "flex-end" }}>
        {close && (
          <TouchableWithoutFeedback onPress={close}>
            <Image
              style={{ height: 15 }}
              source={require("../../assets/close-pink.png")}
            />
          </TouchableWithoutFeedback>
        )}
      </View>

      <Alert content="Enviar dinero" />

      <Label
        style={{ ...s.size(4), ...s.py(2) }}
        text="Contacto"
        onPress={back}
      />

      {find === false ? (
        <View style={{ ...s.input, justifyContent: "center" }}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              itemValue === "Enviar sin agendar"
                ? setFind(true)
                : setSelectedValue(itemValue)
            }
          >
            {selectedValue === "Contactos" ||
            selectedValue === "Sin contactos" ? (
              <Picker.Item label={selectedValue} value={selectedValue} />
            ) : (
              <Picker.Item label="" value="" />
            )}
            <Picker.Item
              label="Enviar sin agendar"
              value="Enviar sin agendar"
              key="Buscar..."
            />

            {friends &&
              friends.map((x) => (
                <Picker.Item
                  label={x.nickname}
                  value={x.contact_id}
                  key={x.nickname}
                />
              ))}
          </Picker>
        </View>
      ) : (
        <View>
          <Input
            placeholder="Correo electrónico"
            onChangeText={(email) => setSelectedValue(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      )}

      {/* <Text style={{ ...s.textWhite, ...s.textCenter, ...s.py(5) }}>
        Balance actual:
        {balance ? ` $ ${format(balance)} ` : "$0.00"}
      </Text> */}
      <Label style={{...s.textCenter, ...s.py(5)}} text={`Balance actual:\n${balance ? ` $ ${format(balance)} ` : "$0.00"}`}/>

      <View
        style={{
          ...s.my(4),
          justifyContent: "center",
          alignItems: "center",
          height: 50,
        }}
      >
        <Label style={{ color: "black", ...s.size(7), ...s.textCenter }} text={`$ ${format(money)}`}/>
          
        <TextInput
          style={{
            ...s.size(7),
            borderColor: "rgba(0,0,0,0.0)",
            color: "rgba(0,0,0,0.0)",
            width: "70%",
            height: 50,
            textAlign: "center",
            marginTop: -50,
          }}
          onChangeText={(money) => setMoney(parseInt(money))}
          keyboardType="number-pad"
        />
      </View>

      <Label sytle={{ ...s.size(4), ...s.py(1)}} text="¿Quieres decirle algo?"/>
      <Input
        multiline={true}
        maxLength={100}
        onChangeText={(text) => setDescription(text)}
        placeholder="Escribe tu mensaje aquí"
      />

      <View style={styles.checkboxContainer}>
        <View>
          <View
            style={{
              backgroundColor: "white",
              width: 15,
              height: 15,
              position: "absolute",
              marginLeft: 8.5,
              borderRadius: 2,
              marginTop: 8.5,
            }}
          ></View>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
        </View>
        <Label style={{ fontSize: 15 }} text="Acepto los términos y condiciones para realizar esta transferencia."/>
        
      </View>

      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

      <View>
        <TouchableOpacity style={{ ...s.btn() }} onPress={() => next()}>
          <Text style={{ ...s.textWhite, ...s.textButton() }}>Enviar</Text>
        </TouchableOpacity>
      </View>

      
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </Container>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    marginBottom: 30,
  },
  errorMessage: {
    color: "#E94560",
    alignSelf: "center",
    paddingVertical: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#E94560",
  },
});

function mapStateToProps(state) {
  return {
    token: state.auth.token,
    balance: state.auth.user.balance,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateBalance: balance => dispatch(updateBalance(balance))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendMoney);
