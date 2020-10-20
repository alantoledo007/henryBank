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
import { Link, useHistory } from "react-router-native";
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
} from "./Quantum";

function EmailVerifier({
  email,
  error,
  emailVerify,
  sendEmailVerifier,
  navigation,
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
      .catch(() => {
        setState({
          ...state,
          loading: false,
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
      .catch(() => {
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
      <View style={bn("row")}>
        <View style={bn("col-12")}>
          <Logo />
          <Alert content="Verifique su dirección de correo electrónico" />
        </View>
      </View>

      {error && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={true}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ ...s.bg("#fff") }}>
            <Text>{error.status}</Text>
          </View>
        </Modal>
      )}

      {state.needCode && (
        <Text style={{ ...s.mb(4), ...s.textWhite }}>
          Te enviaremos un nuevo código.
          <QTLink
            onPress={switchNeedCode}
            label="¿Ya tienes un código? ESTA ROTO ESTE LINK"
          />
        </Text>
      )}

      {!state.needCode && (
        <Text style={{ ...s.mb(4), ...s.textWhite }}>
          Te enviamos un correo electrónico con
          <Text style={{ fontWeight: "bold" }}> un código de verificación</Text>
          .
          <QTLink
            onPress={switchNeedCode}
            label="¿Aún no te llegó el código? ESTA ROTO ESTE LINK"
          />
        </Text>
      )}

      {(email === null || state.needCode) && (
        <View style={s.mb(4)}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
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
        <View style={s.mb(4)}>
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
            <Text style={s.textColor("red")}>Debes ingresar el código</Text>
          )}
          {errors.code?.type === "pattern" && (
            <Text style={s.textColor("red")}>
              El código ingresado no es válido
            </Text>
          )}
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
          <Link
            onPress={handleSubmit(sendCode)}
            component={TouchableOpacity}
            style={s.btn()}
          >
            <Text style={{ fontWeight: "bold", ...s.textColor("white") }}>
              {!state.loading && "REENVIAR CODIGO"}
              {state.loading && "CARGANDO..."}
            </Text>
          </Link>
        )}
      </View>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    email: state.auth.user.email,
    error: state.email_verifier.error,
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
