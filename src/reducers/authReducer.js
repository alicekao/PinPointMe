import {
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

const initialState = {
  currUserId: null,
  isAuthenticated: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, isAuthenticated: true, currUserId: action.payload };
    case DEAUTH_USER:
      return {...state, isAuthenticated: false, currUserId: null };
    case AUTH_ERROR:
      return {...state, error: action.payload };
  }
  return state;
}