import {
  AUTH_USER,
  DEAUTH_USER
} from '../actions/types';

const initialState = {
  currUser: null,
  isAuthenticated: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, isAuthenticated: true };
    case DEAUTH_USER:
      return {...state, isAuthenticated: false };
    case AUTH_ERROR:
      return {...state, error: action.payload };
  }
  return state;
}