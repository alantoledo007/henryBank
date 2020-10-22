import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "../../style/colors";

import { Container, Label, Alert } from "../../Quantum";


export default function List({ isFetching, transactions, select }) {
    
    if (isFetching) return <ActivityIndicator style={{marginTop: 20}} animating={true} size="large" color={colors.pink} />;
  return (
    <View>
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
  return (
    <TouchableOpacity
      style={{
        backgroundColor: income ? colors.orange : colors.blue,
        height: 50,
        width: 300,
        alignSelf: "center",
        marginVertical: 3.5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      key={key}
      onPress={onPress}
    >
      <Label
        style={{ textAlign: "center", color: colors.white }}
        text={title}
      />
    </TouchableOpacity>
  );
};
