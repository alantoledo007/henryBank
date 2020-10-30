import axios from 'axios';
import { createDispatchHook } from 'react-redux';

import env from '../../env';

export const REQUEST_CONTACTS = "REQUEST_CONTACTS";
export const RECEIVE_CONTACTS = "RECEIVE_CONTACTS";
export const ADD_CONTACT = "ADD_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const GET_CONTACT_TRANSACTIONS = "GET_CONTACT_TRANSACTIONS";

export function getContactTransactions(contactId, token) {
    return dispatch => {
        return axios.post(env.API_URI + "/transactions/contact_transactions", {contactId}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            const data = res.data
            dispatch({type: GET_CONTACT_TRANSACTIONS, payload: data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export function updateContact(data, token) {
    const {id} = data;
    return dispatch => {
        return axios.put(env.API_URI + "/contacts/" + id, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(() => {
            dispatch({type: UPDATE_CONTACT})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export function deleteContact(id, token) {
    return dispatch => {
        return axios.delete(env.API_URI + "/contacts/" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(()=>{
        dispatch({type: DELETE_CONTACT})
    })
    .catch(err=>console.log(err));
    }
}

export function addContact(data, token) {
    return dispatch => {
        return axios.post(env.API_URI + '/contacts', JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                dispatch({type: ADD_CONTACT})
            })
            .catch(err => {
                console.log(err);
            })
    }
}



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
            dispatch(receiveContacts(data))
        })
        .catch(err => console.log(err));
    }
}