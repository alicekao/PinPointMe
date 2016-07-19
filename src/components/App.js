import React, {Component} from 'react';

class App extends Component {
  render() {
    return (
      <div style={{height:'100%'}}>
        Pinpointme djfla;kdjfladfjlaadjflasjf
        {this.props.children}
      </div>
    );
  }
}

export default App;