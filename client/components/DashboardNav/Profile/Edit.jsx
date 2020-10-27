import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Image, StyleSheet } from "react-native";

import { Container, Input, Button, Label, QTLink } from "../../Quantum";
import Toast from "react-native-toast-message";

export default function EditProfile({ token, data, exitEditMode }) {
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

  const onSubmit = data => {
    setDis(false);

  }

  return (
    <>
      <View style={styles.titleWrapper}>
        <View style={styles.imgWrapper}>
          <Image style={styles.img} source={{ uri: avatar }} />
        </View>
        <Label style={styles.nameTitle} text={name} />
      </View>
      <QTLink
        style={{ marginVertical: 5, fontSize: 20 }}
        label="Cambiar dirección de correo electrónico"
      />
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
              />
            )}
            name="address_street"
            defaultValue={address_street}
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
              />
            )}
            name="address_number"
            defaultValue={`${address_number}`}
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
        defaultValue={locality}
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
        defaultValue={province}
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
          marginTop: 5,
        }}
      >
        <Button onPress={exitEditMode} label="Cancelar" />
        <Button onPress={() => {}} label="Guardar" />
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
