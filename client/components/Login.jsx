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
import { LinearGradient } from 'expo-linear-gradient';
import colors from "./style/colors";
import s from './style/styleSheet';
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

// Context de autenticacion
import { AuthContext } from './Context/AuthContext'

function Login({ login, navigation }) {
  const history = useHistory();
  const { control, handleSubmit } = useForm();

  const [hidePassword, setHidePassword] = useState(true);

/*   const { signIn } = React.useContext(AuthContext); */

  //Decidí usar un estado nuevo para mostrar errores. Muestra el error durante 5 segundos
  const [error, setError] = useState("");
  const mostrarError = (err) => {
    setError(err);
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  const onSubmit = (data) => {
    console.log(data)
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
        // Hacemos un signIn en el context para cargar los datos
        // signIn(data)
      })
      .catch((err) => {
        //Manejo de errores:
        console.log(err)
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
      <View style={s.container}>
        <LinearGradient
              // Background Linear Gradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 300,
              }}
          />
        <View>
                <Image source={require("../Logo.png")} style={{ width: 160, height: 160, alignSelf: "center" }}></Image>
                </View>
        <View>
          <Text style={{ ...s.textWhite, fontSize:25,...s.font, ...s.textCenter,...s.mb(5) }}>Iniciar sesión</Text>
        </View>
        <View>
          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
          <View style={s.mb(4)}>
            <Text style={{ ...s.textWhite, ...s.size(4) }}>Correo electrónico</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={{ ...s.input }}
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
              <Text style={{ ...s.textWhite, ...s.size(4) }}>Contraseña</Text>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                    secureTextEntry={hidePassword}
                    style={{ ...s.input}}
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
                    placeholder="••••••••"
                    autoCapitalize="none"
                  />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
              <View style={{ position:'absolute', top:40, right: 15 }}>
                <TouchableWithoutFeedback
                  onPress={() => setHidePassword(!hidePassword)}
                >
                  <Image
                    style={styles.eye}
                    source={
                      hidePassword
                        ? require("../assets/eye.png")
                        : require("../assets/eye-slash.png")
                    }
                  />
                </TouchableWithoutFeedback>
              </View>
              <Link to="/passwordreset" component={TouchableOpacity}>
                <Text style={s.textColor('orange')}>¿Olvidaste tu contraseña?</Text>
              </Link>
            </View>
          </View>
          <TouchableOpacity
            style={s.btn()}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ ...s.textWhite, fontWeight:'bold' }}>INGRESAR</Text>
          </TouchableOpacity>
          
        </View>
        <Link to="/register" component={TouchableOpacity} style={s.mt(6)}>
            <Text style={{ ...s.textCenter, ...s.textColor('orange'), ...s.size(3.5) }}>
                ¿No tienes una cuenta? Registrate
            </Text>
        </Link>
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
