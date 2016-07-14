import React, {Component} from 'react';
import { reduxForm } from 'redux-form';

class Signin extends Component {
  render() {
    const {fields: {username, password}} = this.props;

    return (
      <form>
        <fieldset className="form-group">
          <label>Username: </label>
          <input type="text" {...username.input} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password: </label>
          <input type="password" {...password.input} className="form-control"/>
        </fieldset>
        <button className="btn btn-primary">Log in</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
})(Signin);