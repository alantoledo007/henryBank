import { DELETE_CONTACT, RECEIVE_CONTACTS, REQUEST_CONTACTS, ADD_CONTACT, UPDATE_CONTACT, GET_CONTACT_TRANSACTIONS } from "../actions/contact";

const initialState = {
    isFetching: false,
    list: [],
    transactions: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CONTACTS:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_CONTACTS:
            return {
                ...state,
                isFetching: false,
                list: action.payload
            }
            case ADD_CONTACT:
                return {
                    ...state,
                    isFetching: true
                }
            case DELETE_CONTACT:
                return {
                    ...state
            }
            case UPDATE_CONTACT:
                return {
                    ...state
                }
            case GET_CONTACT_TRANSACTIONS:
                return {
                    ...state,
                    transactions: action.payload
                }
    }
    return state;
}