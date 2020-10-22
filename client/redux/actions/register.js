import Axios from "axios";
import env from '../../env';

export const STEP_ONE = 'STEP_ONE';
export const STEP_TWO = 'STEP_TWO';
export const STEP_THREE = 'STEP_THREE';
export const RESET_REGISTER = 'RESET_REGISTER';
export const REGISTER_CONFIRMATION = 'REGISTER_CONFIRMATION';

export const stepOne = payload => {

    return {
        type: STEP_ONE,
        payload,
    }
}

export const stepTwo = payload => {

    return {
        type: STEP_TWO,
        payload,
    }
}
export const stepThree = payload => {

    return {
        type: STEP_THREE,
        payload,
    }
}
export const resetRegister = () => {

    return {
        type: RESET_REGISTER,
    }
}

export const loadAuth = ({data, token}) => {
    return dispatch => {
        return Axios.put(`${env.API_URI}/auth/register_confirmation`,data,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
        })
        .then(res => res.data)
        .then(async (res) => {
            await dispatch({type:REGISTER_CONFIRMATION, payload:res.data});
            return res;
        });
    }
}
