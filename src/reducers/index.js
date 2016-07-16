import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';
import mapReducer from './mapReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  map: mapReducer,
  form
});

export default rootReducer;