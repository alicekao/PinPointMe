import {
  SET_MAP,
  UPDATE_PLACES,
  UPDATE_CATEGORIES
} from '../actions/types';

const initialState = {
  mapInstance: null,
  places: [],
  categories: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return {...state, mapInstance: action.payload };
    case UPDATE_PLACES:
      return {...state, places: [...state.places, ...action.payload] };
    case UPDATE_CATEGORIES:
      return {...state, categories: action.payload };
    default:
      return state;
  }
}