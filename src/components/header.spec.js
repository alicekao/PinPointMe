import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import {Header} from './header';

describe('Header', () => {
  it('Should have nav items', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('Link').first().html().includes('PinPointMe')).toBe(true);
    expect(wrapper.find('nav').length).toEqual(1);
  });
  it('Should show sign in if not signed in', () => {
    const spy = createSpy();
    const wrapper = shallow(<Header isAuth={false} logoutUser={spy}/>);
    expect(wrapper.find('.nav-link').html().includes('Sign in')).toBe(true);
    expect(wrapper.find('.nav-link').html().includes('Sign out')).toBe(false);
    wrapper.find('Link').at(1).simulate('click');
    expect(spy).toNotHaveBeenCalled();
  });
  it('Should show sign out if signed in', () => {
    const wrapper = shallow(<Header isAuth={true} />);
    expect(wrapper.find('.nav-link').html().includes('Sign out')).toBe(true);
    expect(wrapper.find('.nav-link').html().includes('Sign in')).toBe(false);
  });
  it('Should handle logout', () => {
    const spy = createSpy();
    const wrapper = shallow(<Header isAuth={true} logoutUser={spy}/>);
    wrapper.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});

