import { combineReducers } from 'redux';
import generalReducers from './generalReducers';
import { searchResultsReducer } from './searchReducers';

const rootReducer = combineReducers({
    searchResultsReducer,
    generalReducers
});

export default rootReducer;