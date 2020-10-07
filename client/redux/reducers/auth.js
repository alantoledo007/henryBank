const initialState = {
    token: null,
    user: {
        id: null,
        email: null,
        name: null,
        surname: null,
        avatar: null
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