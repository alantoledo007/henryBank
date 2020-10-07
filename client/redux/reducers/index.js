import { combineReducers} from 'redux';
import auth from './auth';
import register from './register';

const reducers = combineReducers({
    auth, register
})

export default reducers;