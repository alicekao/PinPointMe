import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SideBarEntry from './SideBarEntry';

class SideBar extends Component {

  componentWillMount() {
    this.props.fetchUserCategories();
  }

  renderSidebar() {
    return (
      <div className="list-group">
        <SideBarEntry
          onClick={() => this.props.filterPOIsByCategory(null) }
          key={null}
          name={'Show all'}
          count={this.props.places.length}
          />
        {this.renderExistingCategories() }
      </div>
    );
  }

  renderExistingCategories() {
    if (this.props.categories.length) {
      return this.props.categories.map(cat => {
        return <SideBarEntry
          onClick={() => this.props.filterPOIsByCategory(cat.categoryName) }
          name={cat.categoryName}
          key={cat.id}
          count={cat.count || 1}
          />
      });
    }
  }

  render() {
    return (
      <div className="col-md-3">
        <h3>Categories</h3>
        {this.renderSidebar() }
        <button onClick={this.props.addNewCategory}>Add food</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.map.categories,
    places: state.map.places
  }
}

export default connect(mapStateToProps, actions)(SideBar);