const initialState = {
    transactions: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                transactions: action.payload
            };
        default:
            return state;
    }
}