import {
  SET_MAP,
  UPDATE_PLACES
} from '../actions/types';

const initialState = {
  mapInstance: null,
  places: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return {...state, mapInstance: action.payload };
    case UPDATE_PLACES:
      return {...state, places: [...state.places, ...action.payload] };
    default:
      return state;
  }
}