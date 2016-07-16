import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class mapContainer extends Component {
  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
    this.props.setMap(map);
  }

  render() {
    return (
      <div id="map" style={{height:'100%'}}>
      </div>
    );
  }
}

export default connect(null, actions)(mapContainer);