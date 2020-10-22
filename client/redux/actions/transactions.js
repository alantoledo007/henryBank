import Axios from 'axios';
import env from '../../env';

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

export const getTransactions = token => {
    return dispatch => {
        return Axios.get(env.API_URI + '/transactions/mytransactions',  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                dispatch({ type: GET_TRANSACTIONS, payload: response.data })
            })
            .catch(err => {
                console.log(err)
            })
    }
}