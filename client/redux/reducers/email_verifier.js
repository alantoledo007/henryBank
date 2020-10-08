import { EMAIL_VERIFIER_SENT, ERROR_EMAIL_VERIFIER, INIT_EMAIL_VERIFIER } from "../actions/email_verifier";

const initialState = {
    error: null,
    sent: false
}

export default function email_verifier(state = initialState, action){
    switch (action.type) {
        case INIT_EMAIL_VERIFIER:
            return initialState;
        case EMAIL_VERIFIER_SENT:
            return {
                ...state,
                sent: true,
                error: null
            };
        case ERROR_EMAIL_VERIFIER:
            return {
                ...state,
                error: action.payload,
                sent: false
            };
        default:
            return state;
    }
}