import {
  SET_MAP
} from '../actions/types';

const initialState = {
  map: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return {...state, map: action.payload };
    default:
      return state;
  }
}