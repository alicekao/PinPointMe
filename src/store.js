import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import promiseMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, logger)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;