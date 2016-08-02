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
        this.props.places.forEach(place=>{
          this.props.setMarker(place, map)
        })
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
        map.setZoom(17);
      }
      else {
        map.setCenter(foundPlace.geometry.location);
        map.setZoom(17);
      }
      console.log(foundPlace);

      // Set marker on map
      this.props.setMarker(foundPlace, map);
      // foundMarker.set
    });
  }

  render() {
    return (<div style={{ height: "100%" }} id="map">Map</div>)
  }
}

export default connect(null, actions)(Map);