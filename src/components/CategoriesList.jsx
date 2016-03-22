import React, { Component, PropTypes } from 'react';
import CategoriesListItem from './CategoriesListItem';
import CategoriesListEditFormItem from './CategoriesListEditFormItem';

export default class CategoriesList extends Component {

  constructor() {
    super();
    this.onEditClick = this.onEditClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.state = {
      editable: null,
    };
  }

  onEditClick(category) {
    this.setState({ editable: category });
  }

  onCancelClick() {
    this.setState({ editable: null });
  }

  render() {
    return (
      <table className="ui single line compact table">
        <tbody>
        {this.props.categories.valueSeq().map(category =>
          this.state.editable === category
            ?
            <CategoriesListEditFormItem
              key={category.get('id')}
              category={category}
              onCancelClick={this.onCancelClick}
              onSubmit={this.props.onSave}
              form={this.props.form}
              reset={this.props.reset}
            />
            :
            <CategoriesListItem
              key={category.get('id')}
              category={category}
              onDeleteClick={this.props.onDelete}
              onEditClick={this.onEditClick}
            />
        )}
        </tbody>
      </table>
    );
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
};
