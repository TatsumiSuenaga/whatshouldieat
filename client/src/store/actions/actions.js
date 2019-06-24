/**
 * action types
 */

export const ADD_SEARCH_RESULTS = 'ADD_SEARCH_RESULTS';
export const REMOVE_SEARCH_RESULTS = 'REMOVE_SEARCH_RESULTS';

/**
 * action creators
 */

export function addSearchResults(results) {
    return { type: ADD_SEARCH_RESULTS, results};
}

export function removeSearchResults() {
    return { type: REMOVE_SEARCH_RESULTS };
}