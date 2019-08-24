import * as SearchActions from '../actions/searchActions';

export function searchResultsReducer(state = [], action) {
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