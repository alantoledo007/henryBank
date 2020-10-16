import { RECEIVE_CONTACTS, REQUEST_CONTACTS } from "../actions/contact";

const initialState = {
    isFetching: false,
    list: []
}

export default (state = initialState, action) => {
    switch(action.type){
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
    }
    return state;
}