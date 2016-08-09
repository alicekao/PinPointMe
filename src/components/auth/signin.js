import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';
import Form from './form';

class Signin extends Component {
  handleFormSubmit(formInputs) {
    this.props.signinUser(formInputs);
  }

  render() {
    const {handleSubmit, fields: {username, password}} = this.props;

    return (
      <Form
        handleSubmit={handleSubmit(this.handleFormSubmit.bind(this)) }
        username={username}
        password={password}
        btnTitle={'Log in'}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
}, mapStateToProps, actions)(Signin);