import axios from 'axios';
import { browserHistory} from 'react-router';
import {
  SIGN_UP,
  SET_MAP,
  AUTH_USER
} from './types';

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

export function fetchPlaces(id) {
  axios.get('/api/places/fetchForId/' + id)
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log('Error: ', err);
    });
}

export function addNewPlace(data) {
  axios.post('/api/places/new', {name: 'mks', lat: 1, lng: 0.5, category: 'school'}, {headers: {authorization: localStorage.getItem('token')}})
    .then(resp => {
      console.log('response from server is: ', resp);
    })
    .catch(err => {
      console.log('Error: ', err);
    })
}

export function logoutUser() {
  console.log(dispatch);
}