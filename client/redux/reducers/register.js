import { NOMBRE } from '../actions/register';

const initialState = {
    name: 'default'
}

export default (state = initialState, action) => {

    switch (action.type){
        
        case NOMBRE: {
            return {
                ...state,
                name: action.payload
            }
        }
    }
    return state

}