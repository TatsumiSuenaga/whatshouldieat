import { combineReducers } from 'redux';
import generalReducers from './generalReducers';
import searchResultsReducer from './searchReducers';

export default combineReducers({
    searchResultsReducer,
    generalReducers
});