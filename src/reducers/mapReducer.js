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
  categories: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP:
      return {...state, mapInstance: action.payload };
    case UPDATE_PLACES:
      return {...state, places: [...state.places, ...action.payload] };
    case ADD_TO_CATEGORY:
      return {...state, categories: [...state.categories, action.payload] };
    case UPDATE_CATEGORIES:
      return {...state, categories: action.payload };
    case FILTER_CATEGORIES:
      const filtered = state.places.filter(place=>{
        return place.category === action.payload;
      });
      return {...state, places: filtered};
    default:
      return state;
  }
}