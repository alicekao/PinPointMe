import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Map from './map';

class mapContainer extends Component {

  componentWillMount() {
    // this.props.fetchPlaces();
    console.log('mounted mapcountainer');
  }

  render() {
    console.log('state is: ', this.props.map);
    return (
      <div style={{ height: '100%' }}>
        hi
        <button onClick={this.props.addNewPlace}>Add place</button>
        <Map />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map
  }
}

export default connect(mapStateToProps, actions)(mapContainer);