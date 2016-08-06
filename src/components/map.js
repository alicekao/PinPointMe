import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Map extends Component {
  componentDidMount() {
    this.geolocate(pos => {
      if (pos) {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: pos || { lat: 40.75, lng: -73.99 },
          zoom: 14
        });
        this.props.setMap(map);
        this.addAutocomplete(map);
        const markers = this.props.places.map(place=>{
          return this.props.setMarker(place, map)
        })
        this.props.setMarkers(markers);
      }
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

  addAutocomplete(map) {
    const input = document.getElementById('search');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', ()=> {
      // Change map view to found location
      const foundPlace = autocomplete.getPlace();
      if (!foundPlace.geometry) {window.alert('Try a different place'); return;}
      if (foundPlace.geometry.viewport) {
        map.fitBounds(foundPlace.geometry.viewport);
        map.setZoom(14);
      }
      else {
        map.setCenter(foundPlace.geometry.location);
        map.setZoom(14);
      }

      // Set marker on map & open iWindow
      const searchResultMarker = this.props.setMarker(foundPlace, map, true);
    });
  }

  render() {
    return (<div style={{ height: "100%" }} id="map"></div>)
  }
}

export default connect(null, actions)(Map);