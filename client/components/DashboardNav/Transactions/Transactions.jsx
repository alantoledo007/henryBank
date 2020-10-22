import React, { useState, useEffect } from "react";
import { Modal, Dimensions, StatusBar, ScrollView, View} from "react-native";
import { connect } from "react-redux";
import { getTransactions } from "../../../redux/actions/transactions";

import { Container, Label, Alert, Button, bn, hbn } from "../../Quantum";
import Transaction from "./Transaction";
import List from "./List";
import { useHeaderHeight } from '@react-navigation/stack';

export function Transactions({
  user,
  token,
  getTransactions,
  isFetching,
  transactions,
}) {
  const headerHeight = useHeaderHeight();
  const { id, name, surname, avatar } = user;
  const [state, setState] = useState({
    user: {
      id: null,
      name: null,
      surname: null,
      avatar: null,
    },
    transactions: [],
  });

  const [show, setShow] = useState(false);
  const [transactionData, setTransactionData] = useState({});

  const select = (data) => {
    setTransactionData(data);
    setShow(true);
  };

  useEffect(() => {
    getTransactions(token);
    setState({
      ...state,
      transactions,
    });
  }, []);

  useEffect(() => {
    setState({
      user: {
        id,
        name,
        surname,
        avatar,
      },
    });
  }, []);
  return (
    <Container style={{height:Dimensions.get('window').height - headerHeight + StatusBar.currentHeight}}>
      <Alert content="Mis movimientos" />


      <ScrollView style={bn('my-2')}>
        <List transactions={transactions} select={select} isFetching={isFetching} />
      </ScrollView>

      <Button outline="primary" color="transparent" style={{width:120,alignSelf: "center",...bn('my-1')}} onPress={()=>getTransactions(token)} label="Actualizar"/>
      <Modal
        visible={show}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShow(false)}
      >
        <Transaction data={transactionData} close={() => setShow(false)} />
      </Modal>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    token: state.auth.token,
    transactions: state.transactions.transactions,
    isFetching: state.transactions.isFetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTransactions: (token) => dispatch(getTransactions(token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
