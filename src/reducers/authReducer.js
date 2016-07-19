import {
  AUTH_USER
} from '../actions/types';

const initialState = {
  currUser: null,
  isAuthenticated: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, isAuthenticated: true }
  }
  return state;
}