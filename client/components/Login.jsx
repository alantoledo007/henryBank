//React
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Link, useHistory } from "react-router-native";
import { useForm, Controller } from "react-hook-form";

//Redux
import { connect } from "react-redux";
import { login } from "../redux/actions/auth";

//Otros
import axios from "axios";
import env from "../env";
import {Container, Logo, QTLink, Button, Input, bn, Alert, Label} from './Quantum';

//Estilos
import colors from "./style/colors";
import s from './style/styleSheet';

function Login({ login, navigation }) {

  const { control, handleSubmit } = useForm();

  const [dis, setDis] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  //Decidí usar un estado nuevo para mostrar errores. Muestra el error durante 5 segundos
  const mostrarError = (err) => {
    setError(err);
    setTimeout(() => {
      setError(" ");
    }, 5000);
  };

  const onSubmit = (data) => {
    setDis(true);
    axios
      .post(env.API_URI + "/auth/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { data } = res.data;
        //Mando la data del usuario (token + id, email, nombre si lo hay, etc) a redux. Redux va a guardarlo en el store y en AsyncStorage
        login(data);
        setDis(false);
        return data;
      })
      .then((data) => {
        //Si los datos incluyen el nombre, significa que el usuario ya verificó su cuenta, por lo tanto redireccionamos a la posición consolidada
        //if (data.user.name) return history.push("/dash");
        //Si no hay nombre, redireccionamos a la pantalla de confirmar registro
        //history.push("/register-confirmation");
      })
      .catch((err) => {
        setDis(false);
        //Manejo de errores:
        if (err.response.data.type == "AUTHENTICATION_FAILED")
          mostrarError("Dirección de correo o contraseña incorrectos.");
        if (err.response.data.type == "VALIDATION_ERROR")
          mostrarError("Por favor ingrese una dirección de correo válida.");
      });
  };

  //Pantalla de carga para mostrar mientras no hayan cargado aún las fonts
  return (
      <Container>
        <View>
          <Logo />
        </View>
        <Alert content="Ingrese a su cuenta Quantunm" style={bn('mb-4')} />
        <View>
          <View style={s.mb(4)}>
            <Label text="Correo electrónico" />
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="ejemplo@mail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  //No estoy seguro si estos dos siguientes son necesarios así que por las dudas los dejo comentados
                  // textContentType="emailAddress"
                  // autoCompleteType="email"
                />
              )}
              name="email"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>

          <View>
            <View style={s.mb(4)}>
              <Label style={bn('mt-2')} text="Contraseña" />
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    secureTextEntry={hidePassword}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="••••••••"
                    autoCapitalize="none"
                    iconRight={hidePassword
                      ? require("../assets/eye.png")
                      : require("../assets/eye-slash.png")
                    }
                    onIconRightPress={()=>setHidePassword(!hidePassword)}
                  />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
              <QTLink to="IndexReset" {...{navigation}} style={bn('text-left')} component={TouchableOpacity} label="¿Olvidaste tu contraseña?" />
            </View>
          </View>
          <Button label="Ingresar" onPress={handleSubmit(onSubmit)} />

          
        </View>
        <QTLink to="Register" {...{navigation}} component={TouchableOpacity} style={s.mt(6)} label="¿No tienes una cuenta? Registrate" />
      </Container>
    );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
