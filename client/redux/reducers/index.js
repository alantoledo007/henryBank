import { combineReducers } from 'redux';
import auth from './auth';
import register from './register';
import PasswordReset from './PasswordReset';

const reducers = combineReducers({
    auth, register, PasswordReset,
    
})

export default reducers;