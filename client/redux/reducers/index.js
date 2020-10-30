import { combineReducers } from 'redux';
import auth from './auth';
import register from './register';
import PasswordReset from './PasswordReset';
import email_verifier from './email_verifier';
import contacts from './contacts';
import transactions from './transactions';
import theme from './theme';

const reducers = combineReducers({
    auth, register, PasswordReset,email_verifier, contacts, transactions, theme
})

export default reducers;