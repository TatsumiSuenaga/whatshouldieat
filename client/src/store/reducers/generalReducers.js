import { combineReducers } from 'redux';
import * as GeneralActions from '../actions/generalActions';

function travelDuration(state = -1, action) {
  switch (action.type) {
    case GeneralActions.SET_TRAVEL_DURATION:
      return action.newValue;
    case GeneralActions.RESET: 
      return -1;
    default:
      return state;
  }
}

function transporationType(state = 'driving', action) {
  switch (action.type) {
    case GeneralActions.SET_TRANSPORTATION_TYPE:
      return action.newValue;
    case GeneralActions.RESET: 
      return 'driving';
    default:
      return state;
  }
}

function latitude(state = '', action) {
  switch (action.type) {
    case GeneralActions.SET_LATITUDE:
      return action.newValue;
    default:
      return state;
  }
}

function longitude(state = '', action) {
  switch (action.type) {
    case GeneralActions.SET_LONGITUDE:
      return action.newValue;
    default:
      return state;
  }
}

function searchScreen(state = 'start', action) {
  switch (action.type) {
    case GeneralActions.SET_SEARCH_SCREEN:
      return action.newValue;
    default:
      return state;
  }
}

function price(state = -1, action) {
  switch (action.type) {
    case GeneralActions.SET_PRICE:
      return action.newValue;
    case GeneralActions.RESET: 
      return -1;
    default:
      return state;
  }
}

function rating(state = -1, action) {
  switch (action.type) {
    case GeneralActions.SET_RATING:
      return action.newValue;
    case GeneralActions.RESET: 
      return -1; 
    default:
      return state;
  }
}

function distance(state = 3, action) {
  switch (action.type) {
    case GeneralActions.SET_DISTANCE:
      return action.newValue;
    case GeneralActions.RESET: 
      return 3;
    default:
      return state;
  }
}

const generalReducers = combineReducers({
  travelDuration,
  transporationType,
  latitude,
  longitude,
  searchScreen,
  price,
  rating,
  distance
})

export default generalReducers;