//React
import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

//Redux
import { connect } from "react-redux";
import { login } from "../redux/actions/auth";

//Otros
import axios from "axios";
import env from "../env";
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


//Estilos
import colors from "./style/colors";
import s from "./style/styleSheet";

function Login({ login, navigation }) {
  const { control, handleSubmit, errors } = useForm();

  const [dis, setDis] = useState(false);

  const [hidePassword, setHidePassword] = useState(true);

  
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
        //Al cambiar el state de redux, se va a renderizar otro stack (EmailVerify, CompleteUserData o Dash)
      })
      .catch((err) => {
        setDis(false);
        //Manejo de errores:
        if(err.response?.data?.code === 401){
          return Toast.show({
            type: "error",
            text1: "Contraseña o email incorrectos",
            text2: "Verifique los datos ingresados, asegurece de estar registrado"
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

  //Pantalla de carga para mostrar mientras no hayan cargado aún las fonts
  return (
    <Container>
      <View>
        <Logo />
      </View>
      <Alert content="Ingrese a su cuenta Quantum" style={bn("mb-4")} />
      <ActivityIndicator animating={dis} size="large" color={colors.pink} />
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
            rules={{
              required: "Ingrese su email",
              pattern: {
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Dirección de correo inválida",
              },
            }}
            defaultValue=""
          />
          {errors.email && <Label type="error" text={errors.email.message}/>}
        </View>

        <View>
          <View style={s.mb(4)}>
            <Label style={bn("mt-2")} text="Contraseña" />
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
                  iconRight={
                    hidePassword
                      ? require("../assets/eye.png")
                      : require("../assets/eye-slash.png")
                  }
                  onIconRightPress={() => setHidePassword(!hidePassword)}
                />
              )}
              name="password"
              rules={{ required: "Ingrese su contraseña" }}
              defaultValue=""
            />
            {errors.password && <Label type="error" text={errors.password.message} />}
            <QTLink
              to="PasswordReset"
              {...{ navigation }}
              style={bn("text-left")}
              component={TouchableOpacity}
              label="¿Olvidaste tu contraseña?"
            />
          </View>
        </View>
        <Button label="Ingresar" onPress={handleSubmit(onSubmit)} />
      </View>
      <QTLink
        to="Register"
        {...{ navigation }}
        component={TouchableOpacity}
        style={s.mt(6)}
        label="¿No tienes una cuenta? Registrate"
      />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
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
