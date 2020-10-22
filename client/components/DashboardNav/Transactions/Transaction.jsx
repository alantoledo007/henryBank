import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import { Container, Label, Alert, bn, hbn, defaultColors, Button } from "../../Quantum";
import colors from "../../style/colors";
export default function Transaction({ data, close }) {
  const theme = useColorScheme();
  console.log(data);
  const { title, description, amount, createdAt } = data;

  const fechaHora = `${createdAt.slice(0, 10)} a las ${createdAt.slice(
    11,
    16
  )}`;

  const income = title.split(" ")[0] === "Recargaste";

  return (
    <View style={{...styles.container }}>
      <View style={{
          ...styles.modal,
          ...theme === 'dark' ? hbn('bg-stats','dark') : hbn('bg-stats'),
          ...bn('borderRadius-5')
        }}>
        
          <Button onPress={close}
            style={{...bn('w-100 py-1 bg-red px-1 w-30'),position:'absolute', top:-5,right:-5 }}
            textStyle={{ color:'#fff' }}
            label="x"
            />
        <Label style={bn('h3')} text={title} />
        <View>
          {description.length > 0 && <Label
            style={bn('h6')}
            text={(income ? "Descripción:" : "Mensaje:") +' '+ description}
          />}
        </View>
        <View>
          <Label style={bn('h5')} text="Fecha:" />
          <Label style={bn('h6')} text={fechaHora} />
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
    ...bn('p-1')
  },
  modal: {
    padding: 25,
    height: 275,
    backgroundColor: colors.white,
    position: "absolute",
    borderRadius: 15,
    shadowOffset:{  width: 0,  height: 0,  },
        shadowOpacity: 1.0,
        elevation:15
    // top: 90,
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    color: colors.blue,
  },
});
