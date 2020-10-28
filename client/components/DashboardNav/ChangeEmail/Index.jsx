import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import env from "../../../env";

//Redux
import { connect } from "react-redux";

//UI
import s from "../../style/styleSheet";

//sub-components
import Email from "./Email";
import Code from "./Code";

import {
  Container,
  Logo,
  QTLink,
  Button,
  Input,
  bn,
  Alert,
  Label,
  toastConfig,
} from "../../Quantum";
import Toast from "react-native-toast-message";

function ChangeEmail({ token, email, sendEmailChangeCode, navigation }) {
  const [newEmail, setNewEmail] = useState("");
  const rules = {
    email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    code: /^[0-9]{6}$/,
  };

  const [state, setState] = useState({
    needCode: true,
    loading: false,
  });

  const requestCode = (data) => {
    // console.log(data);
    return axios
      .post(`${env.API_URI}/auth/email-reset`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setNewEmail(res.data.email);
        return res.data;
      });
  };

  const verifyCode = (data) => {
    // console.log(data);
    return axios.put(`${env.API_URI}/auth/email-reset`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/json",
      },
    })
    .then(res => res.data);
  };
  //   const verifyCode = (data) => {
  //     data.email = email;
  //     setState({
  //       ...state,
  //       loading: true,
  //     });
  //     emailVerify(data)
  //       .then(() => {
  //         setState({
  //           ...state,
  //           needCode: false,
  //           loading: false,
  //         });
  //       })
  //       .catch((err) => {
  //         setState({
  //           ...state,
  //           loading: false,
  //         });
  //         console.log(err.response.data);
  //         if (err.response?.data?.code === 401) {
  //           return Toast.show({
  //             type: "error",
  //             text1: "Código incorrecto",
  //             text2: "Por favor, verifique el código ingresado.",
  //           });
  //         }
  //         if (err.response?.data?.code === 422) {
  //           return Toast.show({
  //             type: "error",
  //             text1: "Datos incorrectos",
  //             text2:
  //               "Uno o más campos no contienen información valida. Por favor verifique e intente nuevamente.",
  //           });
  //         }
  //         if (err.response?.data?.code === 500) {
  //           return Toast.show({
  //             type: "error",
  //             text1: "Error interno",
  //             text2:
  //               "Ocurrió un error interno y nuestro equipo ya está trabajando para solucionarlo.",
  //           });
  //         }

  //         return Toast.show({
  //           type: "error",
  //           text1: "Error de conexión",
  //           text2:
  //             "Por favor, verifique su conexión a internet e intente nuevamente, si el problema persiste ponganse en contacto con el equipo técnico",
  //         });
  //       });
  //   };
  const switchNeedCode = () => {
    setState({
      ...state,
      needCode: !state.needCode,
    });
  };
  return (
    <Container>
      <Logo />
      <Alert style={bn("mb-4")} content="Cambiar email" />
      {state.needCode ? (
        <Email
          switchNeedCode={switchNeedCode}
          email={email}
          newEmail={newEmail}
          requestCode={requestCode}
          rules={rules}
        />
      ) : (
        <Code
          newEmail={newEmail}
          rules={rules}
          switchNeedCode={switchNeedCode}
          verifyCode={verifyCode}
          navigation={navigation}
        />
      )}
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    email: state.auth.user.email,
    token: state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmail);
