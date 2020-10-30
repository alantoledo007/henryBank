import axios from 'axios';
import env from '../../env';

const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS';
export const UPDATE_BALANCE = "UPDATE_BALANCE";

export const updateBalance = (balance) => {
    return {
        type: UPDATE_BALANCE,
        payload: balance
    }
}

export const getTransactions = (token, payload) => {
    return dispatch => {
        dispatch({type: REQUEST_TRANSACTIONS})
        return axios({
            method: 'get',
            url: `${env.API_URI}/transactions/mytransactions`,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            params: payload,
          })
            .then(response => {
                dispatch({ type: RECEIVE_TRANSACTIONS, payload: response.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
}