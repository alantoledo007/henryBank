import React, { useState, useEffect } from "react";
import { View, Text, Modal, ActivityIndicator, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getTransactions } from "../../../redux/actions/transactions";

import { Container, Label, Alert, Button } from "../../Quantum";
import Transaction from "./Transaction";
import List from "./List";
import s from "../../style/styleSheet";

export function Transactions({
  user,
  token,
  getTransactions,
  isFetching,
  transactions,
}) {
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
    <Container>
      {/* <Label style={{ fontSize: 35 }} text="Mis movimientos" /> */}
      <Alert content="Mis movimientos" />
      {/* <ActivityIndicator
        animating={isFetching}
        size="large"
        color={colors.pink}
    /> */}
      {/* <ScrollView  >*/}

        <List transactions={transactions} select={select} isFetching={isFetching} />
      {/* </ScrollView> */}
      <Button style={{width: 190, alignSelf: "center"}} onPress={()=>getTransactions(token)} label="Recargar"/>
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
