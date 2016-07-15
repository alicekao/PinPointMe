import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit(formInputs) {
    this.props.signupUser(formInputs);
  }

  render() {
    const {handleSubmit, fields: {username, password}} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this)) }>
        <fieldset className="form-group">
          <label>Username: </label>
          <input type="text" {...username} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input type="password" {...password} className="form-control"/>
        </fieldset>
        <button action="submit" className="btn btn-primary">Log in</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password']
}, null, actions)(Signup);