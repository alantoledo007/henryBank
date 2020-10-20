import {
	RESET,
} from '../actions/PasswordReset';

const initialState = {
    email: '',
}

export default function PasswordResetReducer(state = initialState, action) {
    // console.log('action redux', action);
    // console.log('RESET ', RESET);
    // console.log('action type: ', action.type)
    switch (action.type) {
        case RESET: {
            // console.log(action.type)
            return {
                ...state,
                email: action.payload,
            }
        }
        default: 
        return state;
    }
}