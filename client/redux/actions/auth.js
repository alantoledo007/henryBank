import Axios from 'axios';
import env from "../../env";
import AsyncStorage from '@react-native-community/async-storage';

export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

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

export function register (data){
    // AsyncStorage.setItem('auth', JSON.stringify(data), err => {
    //     if (err) console.log('ERROR en AsyncStorage.setItem en redux/actions/auth, en register', err);
    // });
    // console.log(data);
    return dispatch => {
        return Axios.post(env.API_URI + '/auth/register',data,{headers:{'accept':'application/json','content-type':'application/json'}})
        .then(res => res.data)
        .then(res => {
            dispatch({ type: REGISTER, payload: res.data});
        });
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const updateUserInfo = data => {
    return {
        type: UPDATE_USER_INFO,
        payload: data
    }
}

export const updateBalances = data => {
    return {
        type: "UPDATE_BALANCES",
        payload: data
    }
}