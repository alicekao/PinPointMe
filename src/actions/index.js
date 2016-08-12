import axios from 'axios';
import { browserHistory} from 'react-router';
import {
  SIGN_UP,
  SET_MAP,
  AUTH_USER,
  DEAUTH_USER,
  AUTH_ERROR,
  UPDATE_PLACES,
  UPDATE_CATEGORIES,
  ADD_TO_CATEGORY,
  FILTER_CATEGORIES
} from './types';

function createAuthHeader() {
  return {
    headers: { authorization: localStorage.getItem('token') }
  }
};

export function addNewCategory(category) {
  // hard coded for 'food'
  return dispatch => {
    axios.post('/api/places/newCategory', { name: 'food' }, createAuthHeader())
      .then(resp => {
        console.log('response from server is: ', resp.data);
      })
      .catch(err => {
        console.log('err: ', err);
      });
  }
}
// data is an obj with place: name, lat, lng, category
export function addNewPlace(data, cb) {
  return dispatch => {
    return axios.post('/api/places/new', data, createAuthHeader())
      .then(resp => {
        cb(true);
        return dispatch(fetchUserCategories());
      })
      .catch(err => {
        console.log('Error: ', err);
        dispatch(authError(err));
      });
  }
}

export function addToCategories(category) {
  return {
    type: ADD_TO_CATEGORY,
    payload: category
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
    return axios.get('/api/places/fetchAll', createAuthHeader())
      .then(resp => {
        dispatch(updatePlaces(resp.data));
      })
      .catch(err => {
        console.log('Couldn\'t fetch places: ', err);
        dispatch(authError(err));
      });
  }
}

export function fetchUserCategories() {
  return dispatch => {
    return axios.get('/api/categories/fetchByUser', createAuthHeader())
      .then(resp => {
        dispatch(updateCategories(resp.data))
      })
      .catch(err => {
        console.log("error: ", err);
      });
  }
}

export function filterPOIsByCategory(category) {
  return {
    type: FILTER_CATEGORIES,
    payload: category
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

function onSignIn(data) {
  return dispatch => {
    localStorage.setItem('token', data.token);
    dispatch({ type: AUTH_USER, payload: data.id });
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
    return axios.post('/auth/signin', { username, password })
      .then(resp => {
        dispatch(onSignIn(resp.data));
      })
      .catch(err => {
        console.log('Error: ', err);
        dispatch(authError(err));
      })
  }
}

export function signupUser({username, password}) {
  return dispatch => {
    return axios.post('/auth/signup', { username, password })
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

export function updateCategories(categoriesArr) {
  return {
    type: UPDATE_CATEGORIES,
    payload: categoriesArr
  }
}
