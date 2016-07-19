import axios from 'axios';
import { browserHistory} from 'react-router';
import {
  SIGN_UP,
  SET_MAP,
  AUTH_USER,
  DEAUTH_USER
} from './types';

const setAuthHeader = {
  headers: { authorization: localStorage.getItem('token') }
};

export function signinUser({username, password}) {
  return function (dispatch) {
    axios.post('/auth/signin', { username, password })
      .then(resp => {
        dispatch(onSignIn(resp.data.token));
      })
      .catch(err => {
        console.log('Error: ', err);
      })
  }
}

export function signupUser({username, password}) {
  return dispatch => {
    axios.post('/auth/signup', { username, password })
      .then(resp => {
        dispatch(onSignIn(resp.data.token));
      })
      .catch(err => {
        console.log('Error in signingup', err);
      });
  }
}

function onSignIn(token) {
  return dispatch => {
    dispatch({
      type: AUTH_USER
    })
    localStorage.setItem('token', token);
    browserHistory.push('/');
  }
}

export function setMap(map) {
  return {
    type: SET_MAP,
    payload: map
  }
}

export function fetchPlaces() {
  axios.get('/api/places/fetchAll', setAuthHeader)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log('Error: ', err);
    });
}

export function addNewPlace(data) {
  axios.post('/api/places/new', { name: 'mks', lat: 1, lng: 0.5, category: 'school' }, setAuthHeader)
    .then(resp => {
      console.log('response from server is: ', resp);
    })
    .catch(err => {
      console.log('Error: ', err);
    })
}

export function logoutUser() {
  localStorage.removeItem('token');
  return { type: DEAUTH_USER };
}