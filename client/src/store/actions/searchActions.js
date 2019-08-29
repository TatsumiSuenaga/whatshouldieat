/**
 * action types
 */

export const ADD_SEARCH_RESULTS = 'ADD_SEARCH_RESULTS';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const REMOVE_SEARCH_RESULTS = 'REMOVE_SEARCH_RESULTS';

export const ADD_SEARCH_LIST = 'ADD_SEARCH_LIST';
export const SET_SEARCH_LIST = 'SET_SEARCH_LIST';
export const REMOVE_SEARCH_LIST = 'REMOVE_SEARCH_LIST';

export const ADD_SERVER_RESPONSE = 'ADD_SERVER_RESPONSE';
export const SET_SERVER_RESPONSE = 'SET_SERVER_RESPONSE';
export const REMOVE_SERVER_RESPONSE = 'REMOVE_SERVER_RESPONSE';

export const TOGGLE_SELECTED_ALL_SEARCH_LIST = 'TOGGLE_SELECTED_ALL_SEARCH_LIST';

/**
 * action creators
 */

export function addSearchResults(results) {
    return { type: ADD_SEARCH_RESULTS, results};
}

export function setSearchResults(results) {
  return { type: SET_SEARCH_RESULTS, results};
}

export function removeSearchResults() {
    return { type: REMOVE_SEARCH_RESULTS };
}

export function addSearchList(searchItem) {
  return { type: ADD_SEARCH_LIST, searchItem};
}

export function setSearchList(searchList) {
  return { type: SET_SEARCH_LIST, searchList};
}

export function removeSearchList(searchItem) {
  return { type: REMOVE_SEARCH_LIST, searchItem };
}

export function addServerResponse(results) {
  return { type: ADD_SERVER_RESPONSE, results};
}

export function setServerResponse(results) {
  return { type: SET_SERVER_RESPONSE, results};
}

export function removeServerResponse() {
  return { type: REMOVE_SERVER_RESPONSE };
}

export function toggleSelectedAllSearchList() {
  return { type: TOGGLE_SELECTED_ALL_SEARCH_LIST};
}
