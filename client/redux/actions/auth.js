import AsyncStorage from '@react-native-community/async-storage';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export const login = data => {
    //Cargamos estos datos primero a AsyncStorage
    AsyncStorage.setItem('auth', JSON.stringify(data), err => {
        if (err) console.log('ERROR en AsyncStorage.setItem en redux/actions/auth, en login', err);
    });
    return {
        type: LOGIN,
        payload: data
    }
}

export const register = data => {
    AsyncStorage.setItem('auth', JSON.stringify(data), err => {
        if (err) console.log('ERROR en AsyncStorage.setItem en redux/actions/auth, en register', err);
    });
    return dispatch => {
       dispatch({ type: REGISTER, payload: data});
    }
}