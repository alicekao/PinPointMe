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
    const { location, name } = data;
    const position = Array.isArray(location) ? new google.maps.LatLng(location[0], location[1]) : location;

    const marker = new google.maps.Marker({
      position,
      map
    });

    marker.addListener('click', () => {
      this.state.infoWindow.setContent(name);
      this.state.infoWindow.open(map, marker);
    });

  }
  
  componentWillReceiveProps(nextProps) {
    nextProps.places.forEach(place => {
      this.setMarker(place, nextProps.map);
    })
  }
  

  submitNewPlace() {
    const dummy = { name: 'empire', lat: 40.85, lng: -74, category: 'tourist' };

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