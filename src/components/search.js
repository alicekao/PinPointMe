import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Search extends Component {

  render() {
    return (
      <div>
        <input id="search" placeholder="Enter a location"></input>
        <button>
          Search
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map.mapInstance
  };
}

export default connect(mapStateToProps, actions)(Search);