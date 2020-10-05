import AsyncStorage from '@react-native-community/async-storage';

export const LOGIN = 'LOGIN';

export const login = data => {
    //Cargamos estos datos primero a AsyncStorage
    AsyncStorage.setItem('auth', JSON.stringify(data), err => {
        if(err) console.log('ERROR en AsyncStorage.setItem en redux/actions/auth, en login',err);
    });
    return {
        type: LOGIN,
        payload: data
    }
}