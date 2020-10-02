const initialState = {
    name: 'default'
}

export default function userReducer(state = initialState, action){
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload
            }
    
        default:
            return state;
    }
}