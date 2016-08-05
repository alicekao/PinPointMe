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
      return <a
        onClick={()=>this.props.filterPOIsByCategory(cat.categoryName)}
        href="#"
        className="list-group-item list-group-item-action"
        key={cat.id}>
        {cat.categoryName} <span className="tag tag-default tag-pill pull-xs-right">{cat.num}</span>
      </a>
    });
  }

  render() {
    return (
      <div className="col-md-3">
        <h3>Categories</h3>
        <div className="list-group">
          {this.renderCategories() }
        </div>
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