import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Map extends Component {
  componentDidMount() {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.75, lng: -73.99 },
      zoom: 14
    });
    this.props.setMap(map);
  }
  
  render() {
    return(<div style={{height: "100%"}} id="map">Map</div>)
  }
}

export default connect(null, actions)(Map);