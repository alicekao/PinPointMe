import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {
  renderToolbar() {
    if (this.props.isAuth) {
      return (
        <li className='nav-item'>
          <Link className='nav-link' to="/signout">Sign out</Link>
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
      <nav className="navbar navbar-light">
        <Link className='navbar-brand' to="/">PinPointMe</Link>
        <ul className='nav navbar-nav'>
          {this.renderToolbar() }
        </ul>
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