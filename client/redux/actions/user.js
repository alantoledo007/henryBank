const SET_NAME = 'SET_NAME';

export function setName(){
    return dispatch => {
        dispatch({type: SET_NAME, payload:'alan'});
    }
}