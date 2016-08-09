import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import Form from './form';

class Signup extends Component {
  handleFormSubmit(formInputs) {
    this.props.signupUser(formInputs);
  }

  render() {
    const {handleSubmit, fields: {username, password}} = this.props;

    return (
      <Form
        handleSubmit={handleSubmit(this.handleFormSubmit.bind(this)) }
        username={username}
        password={password}
        btnTitle={'Sign up'} 
      />
    );
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password']
}, null, actions)(Signup);