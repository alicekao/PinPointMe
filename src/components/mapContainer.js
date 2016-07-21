import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Map from './map';

class mapContainer extends Component {

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.fetchPlaces();
    }
  }

  setMarker(data, map) {
    const { location, name } = data;
    const position = new google.maps.LatLng(location[0], location[1]);
    const infoWindow = new google.maps.InfoWindow({
      content: name
    });

    const marker = new google.maps.Marker({
      position,
      title: name
    });

    marker.setMap(map);
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    nextProps.places.forEach(place => {
      this.setMarker(place, nextProps.map);
    })
  }
  

  submitNewPlace() {
    const dummy = { name: 'chelsea park', lat: 40.75, lng: -74, category: 'park' };

    this.props.addNewPlace(dummy);
    const newLatLng = new google.maps.LatLng(40.75, -74);
    const marker = new google.maps.Marker({
      position: newLatLng,
      title: 'chelsea park'
    });
    marker.setMap(this.props.map);
  }

  render() {
    return (
      <div className="col-md-9" style={{ height: '100%' }}>
        <button onClick={this.submitNewPlace.bind(this) }>Add place</button>
        <Map places={this.props.places}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map.mapInstance,
    isAuth: state.auth.isAuthenticated,
    places: state.map.places
  }
}

export default connect(mapStateToProps, actions)(mapContainer);