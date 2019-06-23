import { combineReducers } from 'redux';
import * as SearchActions from '../actions/actions';

function searchResultsReducer(state = [], action) {
    switch (action.type) {
        case SearchActions.ADD_SEARCH_RESULTS:
            return Object.assign({}, state, {
                results: action.results
            });
        case SearchActions.REMOVE_SEARCH_RESULTS:
            return Object.assign({}, state, {
                results: []
            });
    default:
        return state;
    }
}

const reducers = combineReducers({
    searchResultsReducer
});

export default reducers;