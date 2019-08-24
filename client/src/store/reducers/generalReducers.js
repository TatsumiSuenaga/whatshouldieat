import { combineReducers } from 'redux';
import * as GeneralActions from '../actions/generalActions';

function travelDurationReducer(state = -1, action) {
  switch (action.type) {
    case GeneralActions.SET_TRAVEL_DURATION:
      return action.newValue;
    default:
      return state;
  }
}

function transporationTypeReducer(state = 'driving', action) {
  switch (action.type) {
    case GeneralActions.SET_TRANSPORTATION_TYPE:
      return action.newValue;
    default:
      return state;
  }
}

function latitudeReducer(state = '', action) {
  switch (action.type) {
    case GeneralActions.SET_LATITUDE:
      return action.newValue;
    default:
      return state;
  }
}

function longitudeReducer(state = '', action) {
  switch (action.type) {
    case GeneralActions.SET_LONGITUDE:
      return action.newValue;
    default:
      return state;
  }
}

function searchScreenReducer(state = 'start', action) {
  switch (action.type) {
    case GeneralActions.SET_SEARCH_SCREEN:
      return action.newValue;
    default:
      return state;
  }
}

function priceReducer(state = -1, action) {
  switch (action.type) {
    case GeneralActions.SET_PRICE:
      return action.newValue;
    default:
      return state;
  }
}

function ratingReducer(state = -1, action) {
  switch (action.type) {
    case GeneralActions.SET_RATING:
      return action.newValue;
    default:
      return state;
  }
}

const generalReducers = combineReducers({
  travelDurationReducer,
  transporationTypeReducer,
  latitudeReducer,
  longitudeReducer,
  searchScreenReducer,
  priceReducer,
  ratingReducer
})

export default generalReducers;