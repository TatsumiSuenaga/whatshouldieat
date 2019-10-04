/**
 * action types
 */

export const SET_TRAVEL_DURATION = 'SET_TRAVEL_DURATION';
export const SET_TRANSPORTATION_TYPE = 'SET_TRANSPORTATION_TYPE';
export const SET_LATITUDE = 'SET_LATITUDE';
export const SET_LONGITUDE = 'SET_LONGITUDE';
export const SET_SEARCH_SCREEN = 'SET_SEARCH_SCREEN';
export const SET_PRICE = 'SET_PRICE';
export const SET_RATING = 'SET_RATING';
export const SET_DISTANCE = 'SET_DISTANCE';

export const RESET = 'RESET';


/**
 * action creators
 */

export function updateGenericEntity(type, newValue) {
  return { type: type, newValue };
}