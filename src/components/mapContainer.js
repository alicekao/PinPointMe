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
        content: null,
        maxWidth: 750
      }),
      markers: []
    }
    this.setMarker = this.setMarker.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.fetchPlaces();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state.markers.forEach(marker => {
      marker.setMap(null);
    });

    const filteredPlaces = nextProps.currFilter ? this.props.places.filter(place => {
      return place.category === nextProps.currFilter;
    }) : this.props.places;

    const newMarkers = filteredPlaces.map(place => {
      return this.setMarker(place, this.props.map);
    });
    this.setState({ markers: newMarkers });
  }

  setMarkersArr(arr) {
    this.setState({ markers: arr });
  }

  setMarker(data, map, openWindow) {
    const { geometry, lat, lng, name, address, category } = data;
    const position = lat ? new google.maps.LatLng(lat, lng) : geometry.location;

    const marker = new google.maps.Marker({
      position,
      map
    });

    const optionToSave = `<div id="i-window">
    <form class="form-inline">
      <div class="form-group">
        <input
          class="form-control"
          id="user-category"
          type="text"
          placeholder="category">
        </input>
      </div>
      <button type="submit" class="btn btn-outline-primary" id="save-location">save</button>
    </form> ${name}</div>`;

    const alreadySaved = `<div id="i-window">
    <h6>${name}</h6><em>${category}</em><br>${address}`;

    if (openWindow) {
      this.state.infoWindow.setContent(optionToSave);
      this.state.infoWindow.setOptions({ maxWidth: 750 });
      this.state.infoWindow.open(map, marker);
      document.getElementById('save-location').addEventListener('click', (e) => {
        e.preventDefault();
        const userCategory = document.getElementById('user-category').value;
        this.submitNewPlace(data, userCategory, position, (added) => {
          if (added) {
            this.state.infoWindow.close();
          }
        });
      });
    } else {
      marker.addListener('click', () => {
        this.state.infoWindow.setContent(alreadySaved);
        this.state.infoWindow.setOptions({ maxWidth: 750 });
        this.state.infoWindow.open(map, marker);
      });
    }

    return marker;
  }


  submitNewPlace(data, userCategory, mapPosition, cb) {
    const { vicinity, formatted_address: address, types: category, place_id: google_id, name, geometry: {location}} = data;
    const formattedObj = {
      vicinity, address, google_id, name,
      category: userCategory,
      lat: location.lat(),
      lng: location.lng()
    };
    this.props.addNewPlace(formattedObj);
  }

  render() {
    return (
      <div className="col-md-9" style={{ height: '95%' }}>
        <Search/>
        <Map
          setMarkers={this.setMarkersArr.bind(this) }
          places={this.props.places}
          infoWindow={this.props.infoWindow}
          setMarker={this.setMarker}
          map={this.props.map}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    map: state.map.mapInstance,
    currFilter: state.map.currFilter,
    isAuth: state.auth.isAuthenticated,
    places: state.map.places,
  }
}

export default connect(mapStateToProps, actions)(mapContainer);