import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SideBar extends Component {

  componentWillMount() {
    this.props.fetchUserCategories();
  }
  renderCategories() {
    if (!this.props.categories.length) {
      return <div>Fetching</div>
    }
    return this.props.categories.map(cat => {
      return <li className="list-group-item" key={cat.id}>{cat.categoryName}</li>
    });
  }

  render() {
    return (
      <div className="col-md-3">
        <h3>Categories</h3>
        <ul className="list-group">
          {this.renderCategories() }
        </ul>
        <button onClick={this.props.addNewCategory}>Add food</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.map.categories
  }
}

export default connect(mapStateToProps, actions)(SideBar);