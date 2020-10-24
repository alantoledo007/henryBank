import axios from 'axios';

import env from '../../env';

export const REQUEST_CONTACTS = "REQUEST_CONTACTS";
export const RECEIVE_CONTACTS = "RECEIVE_CONTACTS";

export const requestContacts = () => {
    return {
        type: REQUEST_CONTACTS
    }
}

export const receiveContacts = contacts => {
    return {
        type: RECEIVE_CONTACTS,
        payload: contacts
    }
}

export const getContacts = token => {
    // console.log('TOKEN:',token);
    return dispatch => {
        dispatch(requestContacts);
        axios.get(`${env.API_URI}/contacts`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const { data } = response.data
            // console.log('RESPUESTA EXITOSA:', data);
            dispatch(receiveContacts(data))
        })
        .catch(err => console.log(err));
    }
}

