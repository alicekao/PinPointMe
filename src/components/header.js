import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {
  renderToolbar() {
    const { isAuth, logoutUser } = this.props;

    if (isAuth) {
      return (
        <li className='nav-item pull-right'>
          <a href="#" className='nav-link' onClick={logoutUser}>Sign out</a>
        </li>
      );
    }
    return (
      <li className='nav-item'>
        <Link className='nav-link' to="/signin">Sign in</Link>
      </li>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-faded navbar-fixed-top">
        <div className="container">
          <Link className='navbar-brand' to="/">PinPointMe</Link>
          <ul className='nav navbar-nav'>
            {this.renderToolbar() }
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps, actions)(Header);