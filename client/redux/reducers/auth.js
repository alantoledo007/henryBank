const initialState = {
    token: 'none',
    user: {
        id: 'none',
        email: 'default',
        name: 'default',
        surname: 'default'
    }
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case 'REGISTER':
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}