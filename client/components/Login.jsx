//React
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Link, useHistory } from "react-router-native";
import { useForm, Controller } from "react-hook-form";

//Redux
import { connect } from "react-redux";
import { login } from "../redux/actions/auth";

//Otros
import axios from "axios";
import { AppLoading } from "expo";
import env from "../env";
import {Container, Logo, QTLink, Button, Input, bn, Alert, Label} from './Quantum';

//Estilos
import { LinearGradient } from 'expo-linear-gradient';
import colors from "./style/colors";
import s from './style/styleSheet';

function Login({ login, navigation }) {

  const { control, handleSubmit } = useForm();

  const [dis, setDis] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  //Decidí usar un estado nuevo para mostrar errores. Muestra el error durante 5 segundos
  const [error, setError] = useState(" ");
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
              <QTLink to="/passwordreset" {...{navigation}} style={bn('text-left')} component={TouchableOpacity} label="¿Olvidaste tu contraseña?" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.blue,
    paddingTop: StatusBar.currentHeight,
  },
  titleWrapper: {
    justifyContent: "flex-end",
    paddingTop: 10,
  },
  title: {
    alignSelf: "center",
    textAlign: "center",
    color: colors.white,
    fontSize: 55,
    paddingTop: 70
  },
  inputWrapper: {
    justifyContent: "flex-start",
    marginBottom: 50,
  },
  inputs: {
    justifyContent: "space-around",
    marginBottom: 20,
  },
  input: {
    fontFamily: "Poppins_400Regular_Italic",
    color: "#221F3B",
    backgroundColor: colors.white,
    fontSize: 20,
    height: 40,
    borderBottomColor: colors.pink,
    borderBottomWidth: 5,
    paddingLeft: 8,
  },
  email: {
    marginHorizontal: 15,
    width: 290,
    borderBottomColor: colors.pink,
    borderBottomWidth: 5,
    borderRadius: 5,
    fontSize: 20,
  },
  passwordWrapper: {
    width: 322,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 17,
  },
  password: {
    flex: 1,
    marginVertical: 15,
    marginLeft: 15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  eye: {
    height: 25,
    width: 25,
  },
  errorMessage: {
    color: colors.pink,
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.pink,
    alignSelf: "center",
    width: 250,
    height: 60,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: colors.white,
    fontSize: 30,
    fontFamily: "Poppins_600SemiBold",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  forgotPass: {
    alignSelf: "center",
    paddingTop: 10,
    fontFamily: "Poppins_400Regular",
    color: colors.orange,
    fontSize: 20,
  },
  backButton: {
    backgroundColor: colors.pink,
    height: 40,
    width: 80,
    borderRadius: 7,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
