import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SideBar extends Component {
  render() {
    return (
      <div className="col-md-3">
        Categories:
        <button onClick={this.props.addNewCategory}>Add food</button>
      </div>
    );
  }
}

export default connect(null, actions)(SideBar);