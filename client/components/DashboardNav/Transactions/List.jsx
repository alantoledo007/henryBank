import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import {Card} from 'react-native-paper'
import colors from "../../style/colors";

import { Container, Label, Alert,hbn, bn, Button } from "../../Quantum";
import { useColorScheme } from "react-native-appearance";


export default function List({ isFetching, transactions, select }) {
    
    if (isFetching) return <ActivityIndicator style={{marginTop: 20}} animating={true} size="large" color={colors.pink} />;
  return (
    <View style={bn('row')}>
      {transactions && transactions.length ? (
        transactions.map((transaction, index) => {
          console.log(transaction);
          return (
              <Item
              key={index}
              title={transaction.title}
              onPress={() => select(transaction)}
              />
              );
            })
            ) : (
                <Label text="No hay transacciones" />
                )}
    </View>
  );
}
const Item = ({ key, title, onPress }) => {
  const income = title.split(" ")[0] === "Recargaste";
  const theme = useColorScheme();
  return (
    <Card style={bn('col-12 my-2 bg-cardbg p-3')}>
        <Label text={title} style={bn('text-center mt-2')} />
        <Button
          outline='#fff'
          style={{
            ...theme === 'dark' ? bn('borderColor-light') : bn('borderColor-primary'),
            ...bn('py-2 w-50% my-2 mt-4'),
            alignSelf:'center'
          }}
          color="transparent"
          textStyle={theme === 'dark' ? bn('text-light') : bn('text-primary')}
          key={key}
          onPress={onPress}
          label="Detalles"
        >
      </Button>
    </Card>
    
  );
};
