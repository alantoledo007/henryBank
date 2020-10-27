import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView, Platform } from "react-native";

import { Container, Input, Button, Label, QTLink } from "../../Quantum";

import * as ImagePicker from 'expo-image-picker';
//INSTALAR CON --SAVE, SI SIGUE ACA ESTE COMENTARIO ES PORQUE ME OLVIDÉ CUACKARARARA

export default function ViewProfile({ data, editMode }) {
  // console.log(ImagePicker)
  const [avatarImage, setAvatarImage] = useState(data.avatar);
  const {
    name,
    surname,
    email,
    // avatar,
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      // base64: true
    }).then(result => {
      console.log(result)
      setAvatarImage(result.uri)
    })
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Perdón, necesitamos permisos de la galería para poder modificar tu foto de perfil!');
        }
      }
    })();
  }, []);
  return (
    <>
      <View style={styles.titleWrapper}>
        <View style={styles.imgWrapper}>
          <Image style={styles.img} source={{ uri: avatarImage }} />
        </View>
        <Button
          onPress={pickImage}
          label="Cambiar foto"
          style={{ height: 10, justifyContent: "center" }}
        />
        <Label style={styles.nameTitle} text={name} />
      </View>

      <View style={styles.section}>
        <Label style={styles.subtitle} text="Nombre completo" />
        <Label style={styles.data} text={name + " " + surname} />
      </View>
      <View style={styles.section}>
        <Label style={styles.subtitle} text="Dirección de correo electrónico" />
        <Label style={styles.data} text={email} />
      </View>
      <View style={styles.section}>
        <Label style={styles.subtitle} text="Número de teléfono" />
        <Label style={styles.data} text={phone_number} />
      </View>
      <View style={styles.section}>
        <Label style={styles.subtitle} text="Dirección" />
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
        <Label style={styles.data} text={createdAt} />
      </View>

      <Button onPress={editMode} label="Editar información" />
    </>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    alignItems: "center",
    // paddingTop: 25
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
  section: {
    marginVertical: 5,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  subtitle: {
    fontSize: 15,
  },
  data: {
    fontSize: 30,
  },
});
