import expect from 'expect';
import * as actions from './index';
import * as types from './types';

describe('Actions', () => {
  describe('Should create actions:', () => {
    it('Update categories', () => {
      const categories = ['food', 'hotel'];
      const expectedAction = {
        type: types.UPDATE_CATEGORIES,
        payload: categories
      };
      expect(actions.updateCategories(categories)).toEqual(expectedAction);
    });
    it('Update places', () => {
      const places = [{ name: 'x' }, { name: 'y' }];
      const expectedAction = {
        type: types.UPDATE_PLACES,
        payload: places
      };
      expect(actions.updatePlaces(places)).toEqual(expectedAction);
    });
    it('Set map', () => {
      const map = {map: 'mapInstance'};
      const expectedAction = {
        type: types.SET_MAP,
        payload: map
      };
      expect(actions.setMap(map)).toEqual(expectedAction);
    });
  });
});