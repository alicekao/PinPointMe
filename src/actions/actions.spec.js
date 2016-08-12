import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import expect, { createSpy } from 'expect';
import * as actions from './index';
import * as types from './types';
import localStorage from 'mock-local-storage';

const mockStore = configureStore([promiseMiddleware]);
const mock = new MockAdapter(axios);

describe('Actions', () => {

  describe('Should create actions:', () => {

    it('Update categories', () => {
      const categories = ['food', 'hotel'];
      const expectedAction = {
        type: types.UPDATE_CATEGORIES,
        payload: categories
      };
      const initialState = {};
      const store = mockStore(initialState);
      store.dispatch(expectedAction);

      expect(store.getActions().length).toEqual(1);
      expect(actions.updateCategories(categories)).toEqual(expectedAction).toEqual(store.getActions()[0]);
    });

    it('Update places', () => {
      const places = [{ name: 'x' }, { name: 'y' }];
      const expectedAction = {
        type: types.UPDATE_PLACES,
        payload: places
      };
      const initialState = {};
      const store = mockStore(initialState);
      store.dispatch(expectedAction);

      expect(store.getActions().length).toEqual(1);
      expect(actions.updatePlaces(places)).toEqual(expectedAction).toEqual(store.getActions()[0]);
    });

    it('Set map', () => {
      const map = { map: 'mapInstance' };
      const expectedAction = {
        type: types.SET_MAP,
        payload: map
      };
      const initialState = {};
      const store = mockStore(initialState);
      store.dispatch(expectedAction);

      expect(store.getActions().length).toEqual(1);
      expect(actions.setMap(map)).toEqual(expectedAction).toEqual(store.getActions()[0]);
    });

    it('Logout user', () => {
      const initialState = {};
      const store = mockStore(initialState);
      const expectedAction = {
        type: types.DEAUTH_USER
      };
      store.dispatch(expectedAction);
      expect(store.getActions().length).toEqual(1);
      expect(actions.logoutUser()).toEqual(expectedAction).toEqual(store.getActions()[0]);
    });

    it('Filter by category', () => {
      const category = 'food';
      const expectedAction = {
        type: types.FILTER_CATEGORIES,
        payload: category
      };
      const initialState = {};
      const store = mockStore(initialState);
      store.dispatch(expectedAction);

      expect(store.getActions().length).toEqual(1);
      expect(actions.filterPOIsByCategory(category)).toEqual(expectedAction).toEqual(store.getActions()[0]);
    });
    
    it('Auth error', () => {
      const message = 'invalid';
      const expectedAction = {
        type: types.AUTH_ERROR,
        payload: message
      };
      const initialState = {};
      const store = mockStore(initialState);
      store.dispatch(expectedAction);

      expect(store.getActions().length).toEqual(1);
      expect(actions.authError(message)).toEqual(expectedAction).toEqual(store.getActions()[0]);
    });
    
    it('Check jwt', () => {
      const initialState = {};
      const store = mockStore(initialState);
      const expectedAction = {
        type: types.AUTH_USER
      };
      store.dispatch(expectedAction);
      expect(store.getActions().length).toEqual(1);
      expect(store.getActions()[0]).toEqual(expectedAction);
    });

    describe('Async actions: ', () => {
      const expectedPlaces = [{ name: 1 }, { name: 2 }];
      mock.onGet('/api/places/fetchAll').reply(200, {
        data: expectedPlaces
      });

      mock.onPost('/api/places/new').reply(200, {
        categories: []
      });

      const expectedCategories = ['food', 'tourist'];
      mock.onGet('/api/categories/fetchByUser').reply(200, {
        data: expectedCategories
      });

      it('Fetches user categories', () => {
        const initialState = {};
        const store = mockStore(initialState);
        return store.dispatch(actions.fetchUserCategories())
          .then(() => {
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0].payload.data).toEqual(expectedCategories);
            expect(store.getActions()[0].type).toBe(types.UPDATE_CATEGORIES);
          });
      });

      it('Fetches places', () => {
        const store = mockStore({});
        return store.dispatch(actions.fetchPlaces())
          .then(() => {
            expect(store.getActions().length).toBe(1);
            expect(store.getActions()[0].payload.data).toEqual(expectedPlaces);
            expect(store.getActions()[0].type).toBe(types.UPDATE_PLACES);
          });
      });

      it('Adds new place', () => {
        const place = {name: 'test'};
        const store = mockStore({});
        return store.dispatch(actions.addNewPlace(place, isSuccessful => {
          // Successful addition
          expect(isSuccessful).toBe(true);
        }))
        .then(()=> {
          expect(store.getActions().length).toBe(1);
          // Updates category list
          expect(store.getActions()[0].payload.data).toEqual(expectedCategories);
        });
      });
    });
  });
});