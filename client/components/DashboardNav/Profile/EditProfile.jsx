import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Image, StyleSheet } from "react-native";

import { Container, Input, Button, Label, QTLink } from "../../Quantum";
import Toast from "react-native-toast-message";

export default function EditProfile({ data, exitEditMode, onSubmit }) {
  const { control, handleSubmit, errors } = useForm();
  const [dis, setDis] = useState(false);

  const {
    name,
    surname,
    email,
    avatar,
    createdAt,
    phone_number,
    address_street,
    address_number,
    locality,
    province,
    doc_type,
    doc_number,
  } = data;

  return (
    <>
    <Label style={{fontSize: 45, alignSelf: "center"}} text="Editar perfil"/>
      <View style={styles.titleWrapper}>
        <View style={styles.imgWrapper}>
          <Image style={styles.img} source={{ uri: avatar }} />
        </View>
        <Label style={styles.nameTitle} text={name} />
      </View>
      {/* <QTLink
        style={{ marginVertical: 5, fontSize: 20 }}
        label="Cambiar dirección de correo electrónico"
      /> */}
      {/* <Label text="Cambiar dirección de correo electrónico" />
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            editable={!dis}
          />
        )}
        name="email"
        defaultValue={email}
      /> */}
      {errors.email && <Label type="error" text={errors.email.message}/>}
      <View style={styles.streetInputs}>
        <View>
          <Label text="Calle" />
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <Input
                onChangeText={(value) => onChange(value)}
                value={value}
                editable={!dis}
                // placeholder={address_street}
              />
            )}
            name="address_street"
            rules={{required: "Ingrese su calle"}}
            defaultValue={""}
          />
          {errors.address_street && (
            <Label type="error" text={errors.address_street.message} />
          )}
        </View>
        <View>
          <Label text="Número" />
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <Input
                onChangeText={(value) => onChange(value)}
                value={value}
                editable={!dis}
                keyboardType="number-pad"
                // placeholder={address_number}
              />
            )}
            name="address_number"
            defaultValue={""}
            rules={{required: "Ingrese la altura"}}

            placeholder={address_number}
          />
          {errors.address_number && (
            <Label type="error" text={errors.address_number.message} />
          )}
        </View>
      </View>

      <Label text="Localidad" />
      <Controller
        control={control}
        render={({ onChange, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            editable={!dis}
          />
        )}
        name="locality"
        rules={{required: "Ingrese su localidad de residencia"}}
        defaultValue={""}
      />
      {errors.locality && <Label type="error" text={errors.locality.message} />}

      <Label text="Provincia" />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            editable={!dis}
          />
        )}
        name="province"
        rules={{required: "Ingrese su provincia de residencia"}}
        defaultValue={""}
      />
      {errors.province && <Label type="error" text={errors.province.message} />}

      <Label text="Número de teléfono" />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Input
            onChangeText={(value) => onChange(value)}
            value={value}
            editable={!dis}
            keyboardType="number-pad"
          />
        )}
        name="phone_number"
        defaultValue={phone_number}
      />
      {errors.phone_number && (
        <Label type="error" text={errors.phone_number.message} />
      )}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 15,
        }}
      >
        <Button onPress={exitEditMode} label="Cancelar" />
        <Button onPress={handleSubmit(onSubmit)} label="Guardar" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: "center",
  },
  imgWrapper: {
    // backgroundColor: "blue",
    height: 100,
    width: 100,
    // borderRadius: 5,
  },
  img: {
    flex: 1,
    borderRadius: 20,
  },
  nameTitle: {
    alignSelf: "center",
    fontSize: 45,
  },
  streetInputs: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
