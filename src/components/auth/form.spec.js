import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import Form from './form';

describe('Auth Forms', () => {
  it('Should contain a form', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.type()).toEqual('form');
  });
  it('Should have username and password fields', () => {
    const wrapper = shallow(<Form />);
    expect(wrapper.find('input').length).toEqual(2);
    expect(wrapper.find('fieldset').length).toEqual(2);
    expect(wrapper.find('label').first().text()).toEqual('Username: ');
    expect(wrapper.find('label').at(1).text()).toEqual('Password: ');
  });
  it('Should have a submit button', () => {
    const spy = createSpy();
    const wrapper = shallow(<Form handleSubmit={spy}/>);
    expect(wrapper.find('button').length).toEqual(1);
    wrapper.simulate('submit');
    expect(spy).toHaveBeenCalled();
  });
})