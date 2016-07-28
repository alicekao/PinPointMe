import React, {Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Link } from 'react-router';

class Signin extends Component {
  handleFormSubmit(formInputs) {
    this.props.signinUser(formInputs);
  }

  render() {
    console.log('is authenticated? ', this.props.isAuthenticated);
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
        <Link to="/signup">No account? Sign up here</Link>
        <button action="submit" className="btn btn-primary">Log in</button>
      </form>
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