import {
  SET_MAP,
  UPDATE_PLACES,
  UPDATE_CATEGORIES,
  ADD_TO_CATEGORY,
  FILTER_CATEGORIES
} from '../actions/types';

const initialState = {
  mapInstance: null,
  places: [],
  categories: [],
  currFilter: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return {...state, mapInstance: action.payload };
    case UPDATE_PLACES:
      return {...state, places: action.payload };
    case ADD_TO_CATEGORY:
      return {...state, categories: [...state.categories, action.payload] };
    case UPDATE_CATEGORIES:
      return {...state, categories: action.payload };
    case FILTER_CATEGORIES:
      return {...state, currFilter: action.payload};
    default:
      return state;
  }
}