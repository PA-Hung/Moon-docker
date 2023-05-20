import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activePageReducer from './activePageReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    activePage: activePageReducer,
});

export default rootReducer;