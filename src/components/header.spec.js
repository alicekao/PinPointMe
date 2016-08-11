import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import {Header} from './header';
import { Link } from 'react-router';

describe('Header', () => {
  const wrapper = shallow(<Header isAuth={ true } />);
  
  it('Should have nav items', () => {
    expect(wrapper.containsMatchingElement(<Link to="/">PinPointMe</Link>)).toBe(true);
    expect(wrapper.find('nav').length).toEqual(1);
  });
  it('Should show sign in if not signed in', () => {
    const spy = createSpy();
    let wrapper = shallow(<Header isAuth={false} logoutUser={spy}/>);
    expect(wrapper.containsMatchingElement(<Link to="/signin">Sign in</Link>)).toBe(true);
    expect(wrapper.find('.nav-link').html().includes('Sign out')).toBe(false);
    wrapper.find('Link').at(1).simulate('click');
    expect(spy).toNotHaveBeenCalled();
  });
  it('Should show sign out if signed in', () => {
    expect(wrapper.find('.nav-link').html().includes('Sign out')).toBe(true);
    expect(wrapper.find('.nav-link').html().includes('Sign in')).toBe(false);
  });
  it('Should handle logout', () => {
    const spy = createSpy();
    let wrapper = shallow(<Header isAuth={true} logoutUser={spy}/>);
    wrapper.find('a').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});

