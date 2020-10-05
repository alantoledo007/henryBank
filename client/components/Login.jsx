//React
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
  Button,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { Link } from "react-router-native";
import { useForm, Controller } from "react-hook-form";

//Redux
import { login } from "../redux/actions/auth";

//Otros
import axios from "axios";
import { AppLoading } from "expo";

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
  const { control, handleSubmit } = useForm();

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
      .post("http://192.168.0.19:3000/api/auth/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        login(res.data.data);
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
                  style={styles.input}
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
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="Contraseña"
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
          <Link to="/">
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
    backgroundColor: colors.azul,
    paddingTop: StatusBar.currentHeight,
  },
  titleWrapper: {
    justifyContent: "flex-end",
    paddingTop: 10,
  },
  title: {
    alignSelf: "center",
    color: colors.blanco,
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
    marginBottom: 20
  },
  input: {
    fontFamily: "Poppins_400Regular_Italic",
    color: "#221F3B",
    backgroundColor: colors.blanco,
    margin: 15,
    height: 40,
    width: 250,
    borderBottomColor: colors.rosa,
    borderBottomWidth: 5,
    borderRadius: 5,
    fontSize: 20,
    paddingLeft: 8,
    paddingBottom: 5,
  },
  errorMessage: {
    color: colors.rosa,
    alignSelf: "center",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.rosa,
    alignSelf: "center",
    width: 250,
    height: 60,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: colors.blanco,
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
    color: colors.naranja,
    fontSize: 20,
  },
  backButton: {
    backgroundColor: colors.rosa,
    height: 40,
    width: 80,
    borderRadius: 7,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  backButtonText: {
    color: colors.blanco,
    fontSize: 20,
    fontFamily: "Poppins_400Regular",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
