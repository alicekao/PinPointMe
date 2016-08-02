import React, {Component} from 'react';
import Header from './header';
import { connect } from 'react-redux';
import * as actions from '../actions';

class App extends Component {

  componentWillMount() {
    this.props.checkJWT();
  }

  render() {
    return (
      <div className="container-fluid" style={{ height: '100%' }}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, actions)(App);