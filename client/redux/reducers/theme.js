const initialState = {
    theme: null
}


export default (state = initialState, action) => {
    switch(action.type){
        case 'SWITCH_THEME':
            return {
                ...state,
                theme: action.payload
            }
    }
    return initialState;
}