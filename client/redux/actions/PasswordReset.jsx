import AsyncStorage from '@react-native-community/async-storage';

export const RESET = 'RESET'; 

export const passwordReset = data => {
    //console.log('Pass reset', data);
    return {
        type: RESET,
        payload: data,
    }
}