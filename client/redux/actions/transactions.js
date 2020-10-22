import Axios from 'axios';
import env from '../../env';

const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS';

export const getTransactions = token => {
    return dispatch => {
        dispatch({type: REQUEST_TRANSACTIONS})
        return Axios.get(env.API_URI + '/transactions/mytransactions',  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch({ type: RECEIVE_TRANSACTIONS, payload: response.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
}