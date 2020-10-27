import React, { useState, useEffect } from "react";
import { Modal, Dimensions, StatusBar,  Button, ScrollView, View, TouchableOpacity, Platform, Text} from "react-native";
import { connect } from "react-redux";
import { getTransactions } from "../../../redux/actions/transactions";

import { Container, Label, Alert, bn, hbn } from "../../Quantum";
import Transaction from "./Transaction";
import List from "./List";
import { useHeaderHeight } from '@react-navigation/stack';
import DateTimePicker from "@react-native-community/datetimepicker";
import s from '../../style/styleSheet'

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

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [showw, setShoww] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShoww(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShoww(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

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
       {transactions.length ? <Alert content="Mis movimientos" /> : <Alert content="Sin movimientos" />} 

       <View>

       <Label text='Filtra por fecha:' style={hbn('mt-3')} />
     
      
            <TouchableOpacity style={{...s.btn(), ...s.my(2), ...s.py(2)}} onPress={showDatepicker}>
            <Label text={date.toDateString()} />
            </TouchableOpacity>

   
      
      {showw && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>


      <ScrollView style={bn('my-2')}>
        <List transactions={transactions} select={select} isFetching={isFetching} />
      </ScrollView>

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
