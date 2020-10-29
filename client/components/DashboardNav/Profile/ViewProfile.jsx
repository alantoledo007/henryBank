import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Platform, TouchableHighlight } from "react-native";

import { Container, Input, Button, Label, QTLink } from "../../Quantum";
import Toast from "react-native-toast-message";

import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import colors from "../../style/colors";
import s from "../../style/styleSheet";
import Icon from "react-native-vector-icons/Feather";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ViewProfile({
  data,
  editMode,
  updateAvatar,
  navigation,
}) {
  // console.log(ImagePicker)
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

  const pickImage = async () => {
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    }).then((result) => updateAvatar(result.base64));
  };

  useEffect(() => {
    //Pedimos permiso para acceder a la galería
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          Toast.show({
            type: "error",
            text1:
              "Si deseas modificar tu foto de perfil, deberás darnos permiso para acceder a tu galería de fotos.",
          });
        }
      }
    })();
  }, []);
  return (
    <>
      <View style={{alignItems: "center"}}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={{ uri: avatar }} />
          </View>
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 25,
              backgroundColor: colors.pink,
              alignSelf: "flex-end",
              bottom: 25,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Icon 
              name="image"
              size={20}
              color={colors.white}
            />
          </View>
        </TouchableOpacity>
      </View>

      
      <View style={styles.section}>
        <Label style={styles.subtitle} text="Nombre completo:" />
        <Label style={styles.data} text={name + " " + surname} />
      </View>
      <View style={styles.email}>
        <View style={styles.section}>
          <Label
            style={styles.subtitle}
            text="Dirección de correo electrónico:"
          />
          <Label style={styles.data} text={email} />
        </View>
        <TouchableOpacity
          style={{
            width: 35,
            height: 35,
            borderRadius: 25,
            backgroundColor: colors.pink,
            marginRight: 25,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => navigation.navigate("Cambiar Email")}
        >
          <Icon 
            name="chevron-right"
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Label style={styles.subtitle} text="Número de teléfono:" />
        <Label style={styles.data} text={phone_number} />
      </View>
      <View style={styles.section}>
        <Label style={styles.subtitle} text="Domicilio:" />
        <Label
          style={styles.data}
          text={`${address_street} ${address_number}, ${
            locality === province ? locality : locality + ", " + province
          }`}
        />
      </View>
      <View style={styles.section}>
        <Label
          style={styles.subtitle}
          text={`Nº de documento (${doc_type.toUpperCase()}):`}
        />
        <Label style={styles.data} text={doc_number} />
      </View>
      <View style={styles.section}>
        <Label style={styles.subtitle} text={"Fecha de registro:"} />
        <Label style={styles.data} text={createdAt.slice(0, 10)} />
      </View>

          <Button onPress={editMode} label="editar"/>

    </>
  );
}

const styles = StyleSheet.create({
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
  section: {
    marginVertical: 5,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  subtitle: {
    fontSize: 13,
  },
  data: {
    // fontSize: 20,
  },
  email: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
