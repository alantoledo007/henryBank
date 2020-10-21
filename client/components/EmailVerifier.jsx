// este es el verificado de correo electrónico.

//General
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  sendEmailVerifier,
  emailVerify,
} from "../redux/actions/email_verifier";

//Redux
import { connect } from "react-redux";

//UI
import s from "./style/styleSheet";

import {
  Container,
  Logo,
  QTLink,
  Button,
  Input,
  bn,
  Alert,
  Label,
  toastConfig
} from "./Quantum";
import Toast from 'react-native-toast-message';

function EmailVerifier({
  email,
  emailVerify,
  sendEmailVerifier
}) {
  const { control, handleSubmit, errors } = useForm();

  const rules = {
    email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    code: /^[0-9]{6}$/,
  };

  const [state, setState] = useState({
    needCode: false,
    loading: false,
  });

  const verifyCode = (data) => {
    data.email = email;
    setState({
      ...state,
      loading: true,
    });
    emailVerify(data)
      .then(() => {
        setState({
          ...state,
          needCode: false,
          loading: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loading: false,
        });
        console.log(err.response.data);
        if(err.response?.data?.code === 401){
          return Toast.show({
            type: "error",
            text1: "Código incorrecto",
            text2: "Por favor, verifique el código ingresado."
          })
        }
        if(err.response?.data?.code === 422){
          return Toast.show({
            type: "error",
            text1: "Datos incorrectos",
            text2: "Uno o más campos no contienen información valida. Por favor verifique e intente nuevamente."
          })
        }
        if(err.response?.data?.code === 500){
          return Toast.show({
            type: "error",
            text1: "Error interno",
            text2: "Ocurrió un error interno y nuestro equipo ya está trabajando para solucionarlo."
          })
        }

        return Toast.show({
          type: "error",
          text1: "Error de conexión",
          text2: "Por favor, verifique su conexión a internet e intente nuevamente, si el problema persiste ponganse en contacto con el equipo técnico"
        });
      });
  };

  const sendCode = (data) => {
    setState({
      ...state,
      loading: true,
    });
    sendEmailVerifier(data)
      .then(() => {
        setState({
          ...state,
          needCode: false,
          loading: false,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          loading: false,
        });
      });
  };

  const switchNeedCode = () => {
    setState({
      ...state,
      needCode: !state.needCode,
    });
  };

  return (
    <Container>
      <Logo />
      <Alert style={bn('mb-4')} content="Verificación de correo electrónico" />

      {state.needCode && (
          <Label text="Te enviaremos un nuevo código." />
      )}

      {(email === null || state.needCode) && (
        <View style={s.mb(4)}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                placeholder="Correo electrónico"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                editable={false}
                //No estoy seguro si estos dos siguientes son necesarios así que por las dudas los dejo comentados
                //textContentType="emailAddress"
                autoCompleteType="email"
              />
            )}
            name="email"
            rules={{
              required: true,
              pattern: rules.email,
              maxLength: 191,
            }}
            defaultValue={email}
          />
          <QTLink
            style={bn('text-left')}
            onPress={switchNeedCode}
            label="¿Ya tienes un código?"
          />
          {errors.email?.type === "required" && (
            <Text style={s.textColor("red")}>
              Debes ingresar tu correo electrónico
            </Text>
          )}
          {errors.email?.type === "pattern" && (
            <Text style={s.textColor("red")}>
              El correo electrónico ingresado no es válido
            </Text>
          )}
          {errors.email?.type === "maxLength" && (
            <Text style={s.textColor("red")}>
              El correo electrónico no puede exceder los 191 caracteres
            </Text>
          )}
        </View>
      )}

      {!state.needCode && (
        <View style={bn('mb-4')}>
          <Label style={{...bn('mt-2')}} text="Te enviamos un correo electrónico con un código de verificación"/>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                // style={{ ...s.input }}
                placeholder="Ingrese el código"
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                //No estoy seguro si estos dos siguientes son necesarios así que por las dudas los dejo comentados
                // textContentType="emailAddress"
                // autoCompleteType="email"
              />
            )}
            name="code"
            rules={{
              required: true,
              pattern: rules.code,
            }}
            defaultValue={null}
          />
          {errors.code?.type === "required" && (
            <Label type="error" text="Debes ingresar el código" />
          )}
          {errors.code?.type === "pattern" && (
            <Label type="error" text="El código ingresado no es válido" />
          )}
          <QTLink
            style={bn('text-left')}
            onPress={switchNeedCode}
            label="¿Aún no te llegó el código?"
          />
        </View>
      )}

      <View>
        {/* BOTON */}
        {!state.needCode && (
          <Button
            onPress={handleSubmit(verifyCode)}
            label={!state.loading ? "VERIFICAR" : "CARGANDO..."}
          />
        )}
        {state.needCode && (
          <Button
            onPress={handleSubmit(sendCode)}
            label={!state.loading ? "REENVIAR CODIGO" : "CARGANDO..."}
          />
        )}
      </View>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    email: state.auth.user.email,
    sent: state.email_verifier.sent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendEmailVerifier: (data) => dispatch(sendEmailVerifier(data)),
    emailVerify: (data) => dispatch(emailVerify(data)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerifier);
