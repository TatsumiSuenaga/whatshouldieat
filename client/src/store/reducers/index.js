import { combineReducers } from 'redux';
import generalReducers from './generalReducers';
import searchReducers from './searchReducers';

export default combineReducers({
    searchReducers,
    generalReducers
});