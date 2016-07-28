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
    const { geometry, lat, lng, name, vicinity, formatted_address: address, types: category, place_id: google_id } = data;
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
        const formattedData = {
          name,
          lat: position.lat(),
          lng: position.lng(),
          google_id,
          category,
          address,
          vicinity
        };
        this.submitNewPlace(formattedData, position)
        console.log('data to be sent is: ', formattedData);
      });
    });

  }


  submitNewPlace(formattedObj, mapPosition) {
    this.props.addNewPlace(formattedObj);
    console.log('added!');
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
    places: state.map.places
  }
}

export default connect(mapStateToProps, actions)(mapContainer);