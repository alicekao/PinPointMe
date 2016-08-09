import React from 'react';
import { Link } from 'react-router';

const Form = ({handleSubmit, username, password, btnTitle}) => {
  const renderSignup = () => {
    if (btnTitle === 'Log in') {
      console.log('here');
      return (<Link to="/signup">No account? Sign up here</Link>)
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="form-group">
        <label>Username: </label>
        <input type="text" {...username} className="form-control"/>
      </fieldset>
      <fieldset className="form-group">
        <label>Password: </label>
        <input type="password" {...password} className="form-control"/>
      </fieldset>
      <button action="submit" className="btn btn-primary">{btnTitle}</button><br/>
      {renderSignup()}
    </form>
  );
};

export default Form;