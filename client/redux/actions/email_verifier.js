import Axios from 'axios';
import env from '../../env';

export const EMAIL_VERIFIER_SENT  = 'EMAIL_VERIFIER_SENT';
export const ERROR_EMAIL_VERIFIER  = 'ERROR_EMAIL_VERIFIER';
export const INIT_EMAIL_VERIFIER = 'INIT_EMAIL_VERIFIER';
export const EMAIL_VERIFIED = 'EMAIL_VERIFIED';

export function sendEmailVerifier(data){
    return dispatch => {
        return Axios.post(env.API_URI + '/auth/email-verifier',data,{headers:{'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(res => {
            if(res.status === 200)
                dispatch({type:EMAIL_VERIFIER_SENT});
        })
        .catch(err => {
            // console.log(err).response.status;
            dispatch({type: ERROR_EMAIL_VERIFIER, payload: err.response});
        })
    };
}

export function emailVerify(data){
    return dispatch => {
        return Axios.put(env.API_URI + '/auth/email-verifier', JSON.stringify(data), {headers:{'Content-Type': 'application/json'}})
        .then(res => res.data)
        .then(res => {
            dispatch({type:EMAIL_VERIFIED, payload: res.data});
        })
    };
}

export function initEmailVerifier(){
    return {type:INIT_EMAIL_VERIFIER};
}