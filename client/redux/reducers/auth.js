import { LOGIN } from '../actions/auth';

const initialState = {
    token: 'none',
    user: {
        id: 'none',
        email: 'default',
        name: 'default',
        surname: 'default'
    }
}

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case LOGIN:
            //console.log('REDUCER AUTH',action.payload);
            return action.payload;
        default:
            return state;
    }
}