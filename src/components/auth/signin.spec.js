import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import SignIn from './signin';

describe('is true', () => {
  it('should work', () => {
    expect(true).toEqual(true);
  });
});

describe('Sign In', () => {
  it('Should contain a form', () => {
    const wrapper = shallow(<SignIn />);
    console.log(wrapper.type());
    expect(wrapper.type()).toEqual('form');
  });
})