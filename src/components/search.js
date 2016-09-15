import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Search extends Component {

  render() {
    return (
      <div style={{height: '8%'}}>
        <input className="col-md-10"
          id="search"
          placeholder="Enter a location"></input>
        <button className="col-md-2">
          Search
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map.mapInstance,
    currSearch: state.map.currSearch
  };
}

export default connect(mapStateToProps, actions)(Search);