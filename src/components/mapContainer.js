import React, {Component} from 'react';
import { connect } from 'react-redux';
import Search from './search';
import * as actions from '../actions/index';
import Map from './map';

class mapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      infoWindow: new google.maps.InfoWindow({
        content: null
      })
    }
    this.setMarker = this.setMarker.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.fetchPlaces();
    }
  }

  setMarker(data, map) {
    const { geometry, lat, lng, name } = data;
    const position = lat ? new google.maps.LatLng(lat, lng) : geometry.location;

    const marker = new google.maps.Marker({
      position,
      map
    });

    const window = `${name}: <button id="save-location">save</button>`

    marker.addListener('click', () => {
      this.state.infoWindow.setContent(window);
      this.state.infoWindow.open(map, marker);
      document.getElementById('save-location').addEventListener('click', () => {
        this.submitNewPlace(data, position)
      });
    });

  }


  submitNewPlace(data, mapPosition) {
    const { vicinity, formatted_address: address, types: category, place_id: google_id, name, geometry: {location}} = data;
    const formattedObj = {
      vicinity, address, category, google_id, name, 
      lat: location.lat(), 
      lng: location.lng()
    };
    this.props.addNewPlace(formattedObj);
    console.log('added!', formattedObj);
  }

  render() {
    return (
      <div className="col-md-9" style={{ height: '100%' }}>
        <button onClick={this.submitNewPlace.bind(this) }>Add place</button>
        <Search />
        <Map
          places={this.props.places}
          infoWindow={this.props.infoWindow}
          setMarker={this.setMarker}
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map.mapInstance,
    isAuth: state.auth.isAuthenticated,
    places: state.map.places,
  }
}

export default connect(mapStateToProps, actions)(mapContainer);