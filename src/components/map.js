import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Map extends Component {
  componentDidMount() {
    this.geolocate(pos => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: pos || {lat: 40.75, lng: -73.99},
        zoom: 14
      });
      this.props.setMap(map);
    });
  }

  geolocate(cb) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        return cb(pos);
      });
    }
    cb(null);
  }

  render() {
    return (<div style={{ height: "100%" }} id="map">Map</div>)
  }
}

export default connect(null, actions)(Map);