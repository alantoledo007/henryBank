import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import { getTransactions } from "../redux/actions/transactions";

export function Transactions({user, token, getTransactions, transactions}) {
    const {id, name, surname, avatar} = user;
    const [state, setState] = useState({
        user: {
            id: null,
            name:null,
            surname: null,
            avatar: null,
        },
        transactions: []
    });

    useEffect(() => {
        getTransactions(token)
        setState({
            ...state,
            transactions
        })
    }, []);

    useEffect(() => {
        setState({
            user: {
                id,
                name,
                surname,
                avatar
            }
        })
    }, []);

    return(
        <View>
            {console.log(transactions)}
            {transactions && transactions.length ?
             transactions.map((transaction, index) => (
                <View>
                    <Text>{transaction.title}</Text>
                </View>
            )) : <Text>"No hay transacciones"</Text> }
        </View>
    )
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        token: state.auth.token,
        transactions: state.transactions.transactions
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getTransactions: (token) => dispatch(getTransactions(token))
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Transactions);