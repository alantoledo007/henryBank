import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { QTLink, Button, Input, bn, Label } from "../../Quantum";
import Toast from "react-native-toast-message";

//Redux
import { connect } from 'react-redux';
import { updateUserInfo } from '../../../redux/actions/auth';

//UI
import s from "../../style/styleSheet";
import colors from "../../style/colors";

function Code({ rules, switchNeedCode, verifyCode, newEmail, navigation, updateUserInfo }) {
  const [dis, setDis] = useState(false);
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    setDis(true);
    verifyCode(data)
      .then((res) => {
        //Respuesta satisfactoria de la api
        // console.log(res);
        updateUserInfo(res.user)
        setDis(false);
        Toast.show({
          type: "success",
          text1: "Dirección de correo actualizada exitosamente.",
        });
        navigation.navigate("Panel");
      })
      .catch((err) => {
        //Respuesta fallida, manejo de errores:
        setDis(false);
        // console.log(err.response.data);
        switch(err.response.data.code){
            case 401:
                return Toast.show({
                    type: "error",
                    text1: "El código ingresado no es válido.",
                    text2: "Vuelve a ingresarlo o pide uno nuevo."
                })
        }
        Toast.show({
            type: "error",
            text1: "Hubo un problema...",
            text2: "Por favor, comprueba tu conección a internet y vuelve a intentarlo."
        })
      });
  };

  return (
    <>
      <View style={bn("mb-4")}>
        <Label
          style={{ ...bn("mt-2"), textAlign: "center", alignSelf: "center" }}
          text={`Te enviamos un correo electrónico con un código de verificación${
            newEmail ? " a:" : "."
          }`}
        />
        {newEmail ? (
          <Label
            style={{ textAlign: "center", alignSelf: "center", fontSize: 25 }}
            text={newEmail}
          />
        ) : null}
        <ActivityIndicator animating={dis} size="large" color={colors.pink} />

        <Label
          style={{ textAlign: "center" }}
          text="Luego de ingresarlo tendrás que volver a iniciar sesión."
        />
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
          style={bn("text-left")}
          onPress={switchNeedCode}
          label="¿Aún no te llegó el código?"
        />
      </View>
      <Button
        disabled={dis}
        onPress={handleSubmit(onSubmit)}
        label={dis ? "Cargando..." : "Terminar"}
      />
    </>
  );
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: data => dispatch(updateUserInfo(data))
    }
}

export default connect(null, mapDispatchToProps)(Code);