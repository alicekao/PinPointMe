import React, {Component} from 'react';
import MapContainer from './mapContainer';
import SideBar from './sidebar';

class Main extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <SideBar/>
          <MapContainer/>
        </div>
      </div>
    );
  }
}

export default Main;