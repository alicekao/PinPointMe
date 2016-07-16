import axios from 'axios';
import {
  SIGN_IN,
  SIGN_UP,
  SET_MAP
} from './types';

export function signinUser({username, password}) {
  return function(dispatch) {
    axios.post('/auth/signin', {username, password})
    .then(resp => {
      console.log(resp);
      dispatch({
        type: SIGN_IN,
        payload: resp
      });
    })
    .catch(err => {
      console.log('Error: ', err);
    })
  }
}

export function signupUser({username, password}) {
  axios.post('/auth/signup', {username, password})
    .then(resp => {
      console.log(resp);
    })
    .catch( err => {
      console.log('Error in signingup', err);
    })
}

export function setMap(map) {
  return {
    type: SET_MAP,
    payload: map
  }
}

export function logoutUser() {
  console.log('logging out');
}