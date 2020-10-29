import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { QTLink, Button, Input, bn, Label } from "../../Quantum";
import Toast from "react-native-toast-message";

//UI
import s from "../../style/styleSheet";
import colors from "../../style/colors";

export default function Email({ email, newEmail, switchNeedCode, requestCode, rules }) {
  const [dis, setDis] = useState(false);
  const { control, handleSubmit, errors } = useForm();


  const onSubmit = (data) => {
    setDis(true);
    requestCode(data)
    .then(() => {
      //Respuesta exitosa
      setDis(false);
      switchNeedCode();
    })
    .catch((err)=>{
      //Respuesta fallida
      setDis(false);
      console.log(err);
      Toast.show({
        type: "error",
        text1: "El email ingresado no se encuentra disponible.",
        text2: "Revise los datos ingresados."
      })
    });
  };

  return (
    <>
      <View style={{ marginBottom: 10 }}>
        <Label
          style={{ textAlign: "center", alignSelf: "center" }}
          text={`Actualmente la dirección de correo asociada a tu cuenta es:`}
        />
        <Label
          style={{ textAlign: "center", alignSelf: "center", fontSize: 25 }}
          text={email}
        />
      </View>
      <ActivityIndicator animating={dis} size="large" color={colors.pink} />
      <Label style={{textAlign: "center", alignSelf: "center"}}text="Ingresa la nueva dirección de correo y te enviaremos un código para realizar el cambio:" />
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
              autoCapitalize="none"
              //   editable={false}
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
          defaultValue={newEmail}
        />
        <QTLink
          style={bn("text-left")}
          onPress={switchNeedCode}
          label="¿Ya tienes un código?"
        />
        {errors.email?.type === "required" && (
          <Label type="error" text="Debes ingresar un correo electrónico" />
        )}
        {errors.email?.type === "pattern" && (
          <Label
            type="error"
            text="El correo electrónico ingresado no es válido"
          />
        )}
        {errors.email?.type === "maxLength" && (
          <Label
            type="error"
            text="El correo electrónico no puede exceder los 191 caracteres"
          />
        )}
      </View>
      <Button disabled={dis} onPress={handleSubmit(onSubmit)} label={dis ? "Cargando..." : "Enviar código"} />
    </>
  );
}
