import { combineReducers } from 'redux';
import SearchItem from '../../models/searchItem';
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
    case SearchActions.SET_SEARCH_RESULTS:
      return action.results;
    case SearchActions.ADD_SEARCH_RESULTS:
      let isNewRestaurant = true;
      if (state.length > 0) {
        isNewRestaurant = state.every(restaurant => restaurant.id !== action.results.id);
      }
      return isNewRestaurant ? [...state, action.results] : state;
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
    case SearchActions.SET_SEARCH_LIST:
        return action.searchList;
    case SearchActions.REMOVE_SEARCH_LIST:
      // TODO
      break;
    default:
      return state;
  }
}

const serverResponse = (state = '', action) => {
  switch (action.type) {
    case SearchActions.SET_SERVER_RESPONSE:
      return action.results;
    case SearchActions.ADD_SERVER_RESPONSE:
      return state + action.results;
    case SearchActions.REMOVE_SERVER_RESPONSE:
      return '';
    default:
      return state;
  }
}

const selectedAll = (state = false, action) => {
  switch (action.type) {
    case SearchActions.TOGGLE_SELECTED_ALL_SEARCH_LIST:
      return !state;
    default:
      return state;
  }
}

const searchReducers = combineReducers({
  searchResults,
  searchList,
  serverResponse,
  selectedAll
})

export default searchReducers;