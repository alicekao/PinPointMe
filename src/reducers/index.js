import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form
});

export default rootReducer;