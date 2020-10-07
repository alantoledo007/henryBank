import { combineReducers } from 'redux';
import auth from './auth';
import register from './register';
import PasswordReset from './PasswordReset';
import email_verifier from './email_verifier';

const reducers = combineReducers({
    auth, register, PasswordReset,email_verifier
})

export default reducers;