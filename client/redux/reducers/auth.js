const initialState = {
    token: null,
    user: {
        id: null,
        email: null,
        name: null,
        surname: null,
        avatar: null,
        emailVerifiedAt: null,
        dataCompletedAt: null,
        rechargeCode: null
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
        case 'EMAIL_VERIFIED':
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case 'REGISTER':
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}