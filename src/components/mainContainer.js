import React, {Component} from 'react';
import MapContainer from './mapContainer';
import SideBar from './sidebar';

class Main extends Component {
  render() {
    return (
      <div className="row">
        <SideBar/>
        <MapContainer/>
      </div>
    );
  }
}

export default Main;