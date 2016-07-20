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
      <div style={{ height: '100%' }}>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, actions)(App);