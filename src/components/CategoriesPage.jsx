import React, { Component } from 'react';
import CategoriesList from './CategoriesList';

const AVAILABLE_COLORS = [
  'Red', 'Orange', 'Yellow', 'Olive', 'Green',
  'Teal', 'Blue', 'Violet', 'Purple', 'Pink',
  'Brown', 'Grey', 'Black',
];

export default class CategoriesPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(props) {
    if (props.addForm.isSuccess) {
      this.refs.title.value = '';
    }
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit(event) {
    event.preventDefault();

    const { addCategory, addForm: { inProgress } } = this.props;
    const title = this.refs.title.value;
    const color = this.refs.color.value;

    if (inProgress) {
      return;
    }

    addCategory({ title, color });
  }

  render() {
    const { addForm: { inProgress, isCreated, errorMessages }, categories } = this.props;

    let created;
    let titleErrors;

    if (errorMessages && errorMessages.get('title')) {
      titleErrors = (
        <div className="ui pointing red basic label">
          {errorMessages.get('title').join(', ')}
        </div>
      );
    }

    if (isCreated) {
      created = (
        <div className="ui success message">
          <p>Category created</p>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="column">
          <h2 className="ui header">Categories</h2>

          {created}
          <form onSubmit={this.onSubmit}>
            <div className="ui fluid small action input">
              <input type="text" ref="title" />

              <select className="ui compact selection dropdown" ref="color">
                <option value="">Color</option>
                {AVAILABLE_COLORS.map(color =>
                  <option key={color} value={color.toLowerCase()}>{color}</option>
                )}
              </select>

              <button
                className="ui primary button"
                disabled={inProgress}
                type="submit"
              >
                Create
              </button>
            </div>
            {titleErrors}
          </form>

          <CategoriesList
            categories={categories}
            onDelete={this.props.deleteCategory}
            onSave={this.props.updateCategory}
            form={this.props.updateForm}
            reset={this.props.updateCategoryReset}
          />

        </div>
      </div>
    );
  }

}
