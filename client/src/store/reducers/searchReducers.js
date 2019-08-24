import * as SearchActions from '../actions/searchActions';

const searchResultsReducer= (state = [], action) => {
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

export default searchResultsReducer;