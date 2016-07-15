import axios from 'axios';
import {
  SIGN_IN,
  SIGN_UP
} from './types';

export function signinUser({username, password}) {
  axios.post('/auth/signin', {username, password})
  .then(resp => {
    console.log(resp);
  })
  .catch(err => {
    console.log('Error: ', err);
  })
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

export function logoutUser() {
  console.log('logging out');
}