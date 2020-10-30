import React, { useState, useEffect } from "react";
import { Modal, useColorScheme, Dimensions, StatusBar,  Button, ScrollView, View, TouchableOpacity, Platform, Text} from "react-native";
import { connect } from "react-redux";
import { getTransactions } from "../../../redux/actions/transactions";

import { Container, Label, Alert, bn, hbn } from "../../Quantum";
import Transaction from "./Transaction";
import List from "./List";
import { useHeaderHeight } from '@react-navigation/stack';
import DateTimePicker from "@react-native-community/datetimepicker";
import s from '../../style/styleSheet'
import moment from 'moment';

export function Transactions (props) {

  const theme = useColorScheme();

  const { user, token, getTransactions, isFetching, transactions } = props;
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
  
  const [date, setDate] = useState(new Date(2020, 9, 1));
  const [mode, setMode] = useState('date');
  const [showw, setShoww] = useState(false);
 
  const payload = {
      startDate: "",
      endDate: ""
  };

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

  const [date2, setDate2] = useState(new Date(2020, 9, 30));
  const [mode2, setMode2] = useState('date2');
  const [show2, setShow2] = useState(false);

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow2(Platform.OS === 'ios');
    setDate2(currentDate);
    filterDate(date, currentDate);    
  };

  const filterDate = async (start, end) => {
    const startAndEnd = {
    startDate: start.toISOString().substring(0, 10),
    endDate: end.toISOString().substring(0, 10),
    };
    await getTransactions(token, startAndEnd);
  }

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2('date2');
  };  
  
  const [show, setShow] = useState(false);
  const [transactionData, setTransactionData] = useState({});

  const select = (data) => {
    setTransactionData(data);
    setShow(true);
  };

  useEffect(() => {
    getTransactions(token, payload);
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
    <Container >
       {transactions.length ? <Alert content="Mis movimientos" /> : <Alert content="Sin movimientos" />} 

      <View>

          <Label text='Filtra por fecha:' style={hbn('mt-3')} />

          <View style={{...s.row, justifyContent:'space-between'}}>  
            <TouchableOpacity style={{...s.btn(), ...s.my(2), ...s.py(2), ...s.col(6.4)}} onPress={showDatepicker}>
                <Label text={`Desde  ${moment(date).format('DD/MM/YY').slice(0,5)}`}  style={{color:"white"}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{...s.btn(), ...s.my(2), ...s.py(2), ...s.col(6.4)}} onPress={showDatepicker2}>
                <Label text={`Hasta  ${moment(date2).format('DD/MM/YY').slice(0,5)}`} style={{color:"white"}}/>
            </TouchableOpacity>
      </View>
          
          {show2 && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date2}
                mode={mode2}
                is24Hour={true}
                display="default"
                onChange={onChange2}
                minimumDate={new Date(2015, 0, 1)}
                maximumDate={new Date(2020, 12, 30)}
              />
            )}
          
          {showw && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                minimumDate={new Date(2015, 0, 1)}
                maximumDate={new Date(2020, 12, 30)}
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
    getTransactions: (token, payload) => dispatch(getTransactions(token, payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
