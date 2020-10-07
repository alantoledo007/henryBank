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

//Estilos
import colors from "./style/colors";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";

function Login({ login }) {
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const [hidePassword, setHidePassword] = useState(true);

  //Decidí usar un estado nuevo para mostrar errores. Muestra el error durante 5 segundos
  const [error, setError] = useState("");
  const mostrarError = (err) => {
    setError(err);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const onSubmit = (data) => {
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
        return data;
      })
      .then((data) => {
        //Si los datos incluyen el nombre, significa que el usuario ya verificó su cuenta, por lo tanto redireccionamos a la posición consolidada
        if (data.user.name) return history.push("/dash");
        //Si no hay nombre, redireccionamos a la pantalla de confirmar registro
        history.push("/register-confirmation");
      })
      .catch((err) => {
        //Manejo de errores:
        if (err.response.data.type == "AUTHENTICATION_FAILED")
          mostrarError("Dirección de correo o contraseña incorrectos.");
        if (err.response.data.type == "VALIDATION_ERROR")
          mostrarError("Por favor ingrese una dirección de correo válida.");
      });
  };

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_600SemiBold,
  });

  //Pantalla de carga para mostrar mientras no hayan cargado aún las fonts
  if (!fontsLoaded) return <AppLoading />;
  else
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Iniciar sesión</Text>
        </View>
        <View style={styles.inputWrapper}>
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
          <View style={styles.inputs}>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={{ ...styles.input, ...styles.email }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Correo electrónico"
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
            <View style={styles.passwordWrapper}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    secureTextEntry={hidePassword}
                    style={{ ...styles.input, ...styles.password }}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="Contraseña"
                    autoCapitalize="none"
                  />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
              <View style={styles.eyeWrapper}>
                <TouchableWithoutFeedback
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Image
                    style={styles.eye}
                    source={
                      hidePassword
                        ? require("../assets/ojon't.png")
                        : require("../assets/ojo.png")
                    }
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <Link to="/passwordreset">
            <Text style={styles.forgotPass}>¿Olvidaste tu contraseña?</Text>
          </Link>
        </View>
        <TouchableOpacity style={styles.backButton}>
          <Link to="/">
            <Text style={styles.backButtonText}>Volver</Text>
          </Link>
        </TouchableOpacity>
      </View>
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
    paddingTop: 70,
    fontFamily: "Poppins_600SemiBold",
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
  eyeWrapper: {
    borderBottomColor: colors.pink,
    height: 40,
    width: 30,
    borderBottomWidth: 5,
    backgroundColor: colors.white,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
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
