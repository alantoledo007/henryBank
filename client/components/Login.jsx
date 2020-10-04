//general
import React from "react";
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

//actions
import { setName } from "../redux/actions/user";

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

function Login({ name, setName }) {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  useFonts({
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_600SemiBold,
  });
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Iniciar sesión</Text>
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.inputs}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                textContentType="emailAddress"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Correo electrónico"
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.firstName && <Text>This is required.</Text>}
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                textContentType="password"
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

function mapStateToProps(state) {
  return {
    name: state.user.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setName: () => dispatch(setName()),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.azul,
    paddingTop: StatusBar.currentHeight,
  },
  titleWrapper: {
    // flex: 0.7,
    justifyContent: "flex-end",
    paddingTop: 10,
  },
  title: {
    alignSelf: "center",
    color: colors.blanco,
    fontSize: 50,
    fontFamily: "Poppins_600SemiBold",
  },
  inputWrapper: {
    // flex: 1.7,
    justifyContent: "flex-start",
  },
  inputs: {
    // flex: 0.5,
    justifyContent: "space-around",
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
    // flex: 2,
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
