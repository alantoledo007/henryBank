import React from "react";
import { View, ActivityIndicator } from "react-native";
import colors from "../../style/colors";
import { DataTable, Card } from 'react-native-paper';

import { Container, Label, Alert,hbn, bn, Button } from "../../Quantum";
import { useColorScheme } from "react-native-appearance";
import moment from 'moment';


export default function List({ isFetching, transactions, select }) {

  const theme = useColorScheme();

  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const movimientos = transactions.sort((a, b)=> { return a.createdAt < b.createdAt});

  const time = (time) => {

    const today = moment().format('DD/MM/YY').slice(0, 10);
    const date = moment(time.slice(0, 10)).format('DD/MM/YY');
    const yesterday = moment().subtract(1, 'days').format('DD/MM/YY');

    if (date === today){return 'Hoy'}
    else if (date ===  yesterday){ return 'Ayer'}
    else {return date}

  }
    if (isFetching) return <ActivityIndicator style={{marginTop: 20}} animating={true} size="large" color={colors.pink} />;
return (
  
  <View style={bn('row')}>
     <DataTable>
        <DataTable.Header>
          <DataTable.Title>Fecha</DataTable.Title>
          <DataTable.Title>Concepto</DataTable.Title>
          <DataTable.Title numeric>Importe</DataTable.Title>
        </DataTable.Header>

        {transactions && transactions.length ? (
              transactions.map((transaction, index) => {
              return (

                  <DataTable.Row key={index} onPress={() => select(transaction)}>
                    <DataTable.Cell>{time(transaction.createdAt)}</DataTable.Cell>
                    <DataTable.Cell>{transaction.description}</DataTable.Cell>
                    <DataTable.Cell numeric>{format(transaction.amount)}</DataTable.Cell>
                  </DataTable.Row>

                  );
                })
                ) : (
                  <DataTable.Row></DataTable.Row>
        )}
  </DataTable>
  </View>
)
}
