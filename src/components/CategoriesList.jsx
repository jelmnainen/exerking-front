import React, { Component, PropTypes } from 'react';
import CategoriesListItem from './CategoriesListItem';

export default class CategoriesList extends Component {
  render() {
    return (
      <table className="ui single line compact table">
        <tbody>
        {this.props.categories.valueSeq().map(category =>
          <CategoriesListItem
            key={category.get('id')}
            category={category}
            onDeleteClick={this.props.onDeleteClick}
          />
        )}
        </tbody>
      </table>
    );
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
