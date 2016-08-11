import React from 'react';
import expect, { createSpy } from 'expect';
import { shallow } from 'enzyme';
import Form from './form';

describe('Auth Forms', () => {
  const wrapper = shallow(<Form />);
  it('Should contain a form', () => {
    expect(wrapper.type()).toEqual('form');
  });
  it('Should have username and password fields', () => {
    expect(wrapper.find('input').length).toEqual(2);
    expect(wrapper.find('fieldset').length).toEqual(2);
    expect(wrapper.find('label').first().text()).toEqual('Username: ');
    expect(wrapper.find('label').at(1).text()).toEqual('Password: ');
  });
  it('Should have a submit button', () => {
    const spy = createSpy();
    let wrapper = shallow(<Form handleSubmit={spy}/>);
    expect(wrapper.find('button').length).toEqual(1);
    wrapper.simulate('submit');
    expect(spy).toHaveBeenCalled();
  });
})