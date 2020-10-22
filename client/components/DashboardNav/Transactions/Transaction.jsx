import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { Container, Label, Alert } from "../../Quantum";
import colors from "../../style/colors";
import { LinearGradient } from "expo-linear-gradient";
export default function Transaction({ data, close }) {
  console.log(data);
  const { title, description, amount, createdAt } = data;

  const fechaHora = `${createdAt.slice(0, 10)} a las ${createdAt.slice(
    11,
    16
  )}`;

  const income = title.split(" ")[0] === "Recargaste";

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        
        <View style={{ marginBottom: 15, alignSelf: "flex-end" }}>
          <TouchableWithoutFeedback onPress={close}>
            <Image
              style={{ height: 15 }}
              source={require("../../../assets/close-pink.png")}
            />
          </TouchableWithoutFeedback>
        </View>

        <Label style={{ ...styles.text, fontSize: 25 }} text={title} />
        <View>
          <Label
            style={{ ...styles.text, fontSize: 15 }}
            text={income ? "Descripción:" : "Mensaje:"}
          />
          <Label style={{ ...styles.text }} text={description} />
        </View>
        <View>
          <Label style={{ ...styles.text, fontSize: 15 }} text="Fecha:" />
          <Label style={{ ...styles.text }} text={fechaHora} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22
    marginHorizontal: 7,
  },
  modal: {
    padding: 25,
    height: 275,
    backgroundColor: colors.white,
    position: "absolute",
    borderRadius: 15,
    // top: 90,
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.blue,
  },
});
