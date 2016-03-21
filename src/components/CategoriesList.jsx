import React, { Component, PropTypes } from 'react';
import CategoriesListItem from './CategoriesListItem';

export default class CategoriesList extends Component {
  render() {
    return (
      <table className="ui single line compact table">
        <tbody>
        {this.props.categories.valueSeq().map(category =>
          <CategoriesListItem key={category.get('id')} category={category} />
        )}
        </tbody>
      </table>
    );
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.object.isRequired,
};
