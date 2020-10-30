import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { useColorScheme } from "react-native-appearance";
import { Container, Label, Alert, bn, hbn, Button } from "../../Quantum";
import colors from "../../style/colors";
import moment from 'moment';
import { DataTable,} from 'react-native-paper';

export default function Transaction({ data, close }) {
  const theme = useColorScheme();
  const { title, description, amount, createdAt, message, reference } = data;

  const code = Math.floor(Math.random() * 100000000);

  const fecha = `${createdAt.slice(0, 10)}`;
  const hora = `${createdAt.slice(11,16)}`;

  const income = title.split(" ")[0] === "Recargaste";

  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  return (
    <View style={{...styles.container }}>
      <View style={{
          ...styles.modal,
          ...theme === 'dark' ? hbn('bg-light2','dark') : hbn('bg-light2'),
          ...bn('borderRadius-5')
        }}>
        
          <Button onPress={close}
            style={{...bn('w-100 py-1 bg-red px-1 w-30'),position:'absolute', top:-5,right:-5 }}
            textStyle={{ color:'#fff' }}
            label="x"
            />

                  <View style={{backgroundColor:'#F8F9FA'}}>
        <Label style={bn('h3 text-center py-2')} text={`${format(amount)}`} />
        
        <View>
        <DataTable>
          <DataTable.Row><DataTable.Cell> <Label style={bn('h6')} text={title} /></DataTable.Cell></DataTable.Row>
          <DataTable.Row><DataTable.Cell><Label style={bn('h6')} text={"Descripción:  " + description} /></DataTable.Cell></DataTable.Row>
          <DataTable.Row><DataTable.Cell><Label style={bn('h6')} text={"Fecha:  " + moment(fecha).format('DD/MM/YYYY')} /></DataTable.Cell></DataTable.Row>
          <DataTable.Row><DataTable.Cell><Label style={bn('h6')} text={"Hora:  " + hora} /></DataTable.Cell></DataTable.Row>
          <DataTable.Row><DataTable.Cell><Label style={bn('h6')} text={"Referencia:  " +  (reference ? reference : code)} /></DataTable.Cell></DataTable.Row>
          <DataTable.Row><DataTable.Cell><Label style={bn('h6')} text={"Moneda:  ARS" } /></DataTable.Cell></DataTable.Row>
          <DataTable.Row><DataTable.Cell>{ message ? <Label style={bn('h6')} text={"Mensaje:  " + message} /> : <Label style={bn('h6')} text={""} />}</DataTable.Cell></DataTable.Row>
        </DataTable>
        </View>

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
    height: 450,
    width: '80%',
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
