import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import {Header} from './header';

describe('Header', () => {
  it('Should have nav items', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('nav').length).toEqual(1);
  });
});

