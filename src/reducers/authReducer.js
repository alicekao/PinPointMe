import {
  SIGN_IN
} from '../actions/types';

const initialState = {
  currUser: null,
  isAuthenticated: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {...state, currUser: action.payload, isAuthenticated: true }
  }
  return state;
}