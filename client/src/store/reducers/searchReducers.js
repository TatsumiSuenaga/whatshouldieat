import { combineReducers } from 'redux';
import SearchItem from '../models/searchItem';
import * as SearchActions from '../actions/searchActions';

const defSearchList = [
  new SearchItem('Japanese'),
  new SearchItem('Korean'),
  new SearchItem('Indian'),
  new SearchItem('Chinese'),
  new SearchItem('Thai'),
  new SearchItem('Mexican'),
  new SearchItem('Italian'),
  new SearchItem('Vietnamese'),
  new SearchItem('Burgers'),
  new SearchItem('Pizza'),
  new SearchItem('Wings'),
  new SearchItem('BBQ')
];

const searchResults = (state = [], action) => {
  switch (action.type) {
    case SearchActions.ADD_SEARCH_RESULTS:
      return action.results;
    case SearchActions.REMOVE_SEARCH_RESULTS:
      return [];
  default:
    return state;
  }
}

const searchList = (state = defSearchList, action) => {
  switch (action.type) {
    case SearchActions.ADD_SEARCH_LIST:
      return [
        ...state,
        action.searchItem
      ];
    case SearchActions.REMOVE_SEARCH_LIST:
      // TODO
      break;
    default:
      return state;
  }
}

const serverResponse = (state = '', action) => {
  switch (action.type) {
    case SearchActions.ADD_SERVER_RESPONSE:
      return action.results;
    case SearchActions.REMOVE_SERVER_RESPONSE:
      return '';
    default:
      return state;
  }
}

const searchReducers = combineReducers({
  searchResults,
  searchList,
  serverResponse
})

export default searchReducers;