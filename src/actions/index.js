import axios from 'axios';
import { browserHistory} from 'react-router';
import {
  SIGN_UP,
  SET_MAP,
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  UPDATE_PLACES
} from './types';

const setAuthHeader = {
  headers: { authorization: localStorage.getItem('token') }
};

// data is an obj with place: name, lat, lng, category
export function addNewPlace(data) {
  const { name, lat, lng, category } = data;
  return dispatch => {
    axios.post('/api/places/new', { name, lat, lng, category }, setAuthHeader)
      .then(resp => {
        console.log('response from server is: ', resp.data);
      })
      .catch(err => {
        console.log('Error: ', err);
        dispatch(authError(err));
      });
  }
}

export function authError(message) {
  return {
    type: AUTH_ERROR,
    payload: message
  };
}
export function checkJWT() {
  return dispatch => {
    if (localStorage.getItem('token')) {
      dispatch({ type: AUTH_USER });
    }
  }
}

export function fetchPlaces() {
  return dispatch => {
    axios.get('/api/places/fetchAll', setAuthHeader)
      .then(resp => {
        dispatch(updatePlaces(resp.data));
      })
      .catch(err => {
        console.log('Error: ', err);
        dispatch(authError(err));
      });
  }
}

  // return dispatch => {
  //   axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key='+geolocateKey)
  //   .then(resp => {
  //     console.log('response is: ', resp);
  //   })
  //   .catch(err => {
  //     console.log('Error: ', err);
  //   })
  // }
// }

export function logoutUser() {
  localStorage.removeItem('token');
  return { type: DEAUTH_USER };
}

function onSignIn(token) {
  return dispatch => {
    dispatch({ type: AUTH_USER });
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

export function signinUser({username, password}) {
  return dispatch => {
    axios.post('/auth/signin', { username, password })
      .then(resp => {
        dispatch(onSignIn(resp.data.token));
      })
      .catch(err => {
        console.log('Error: ', err);
        dispatch(authError(err));
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
        dispatch(authError(err));
      });
  }
}

export function updatePlaces(placesArr) {
  return {
    type: UPDATE_PLACES,
    payload: placesArr
  }
}