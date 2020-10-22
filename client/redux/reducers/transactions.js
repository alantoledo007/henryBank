const initialState = {
    isFetching: false,
    transactions: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_TRANSACTIONS':
            return {
                ...state,
                isFetching: true
            }
        case 'RECEIVE_TRANSACTIONS':
            return {
                ...state,
                isFetching: false,
                transactions: action.payload
            };
        default:
            return state;
    }
}