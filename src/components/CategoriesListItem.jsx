import React, { Component, PropTypes } from 'react';

export default class CategoriesListItem extends Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  onDeleteClick() {
    this.props.onDeleteClick(this.props.category.get('id'));
  }

  render() {
    const { category } = this.props;
    return (
      <tr>
        <td>
          {category.get('title')}
        </td>
        <td className="right aligned collapsing">

          <button className="ui mini basic grey compact button">
            Edit
          </button>
          {' '}
          <button className="ui mini basic red compact button" onClick={this.onDeleteClick}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

CategoriesListItem.propTypes = {
  category: PropTypes.object.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
