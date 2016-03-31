import React, { Component, PropTypes } from 'react';

export default class CategoriesListItem extends Component {
  constructor() {
    super();
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  onDeleteClick() {
    const { category } = this.props;
    if (window.confirm(`You are about to delete category "${category.get('title')}"`)) {
      this.props.onDeleteClick(category.get('id'));
    }
  }

  onEditClick() {
    this.props.onEditClick(this.props.category);
  }

  render() {
    const { category } = this.props;
    return (
      <tr>
        <td className="collapsing">
          <div className={`ui mini compact ${category.get('color')} label`}>&nbsp;</div>
        </td>
        <td>
          {category.get('title')}
        </td>
        <td className="right aligned collapsing">
          <button className="ui mini basic grey compact button" onClick={this.onEditClick}>
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
  onEditClick: PropTypes.func.isRequired,
};
