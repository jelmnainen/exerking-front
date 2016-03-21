import React, { Component } from 'react';
import CategoriesList from './CategoriesList';

export default class CategoriesPage extends Component {

  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    this.props.fetchCategories();
  }

  componentWillReceiveProps(props) {
    if (props.isCreated) {
      this.refs.title.value = '';
    }
  }

  componentWillUnmount() {
    this.props.onPageLeave();
  }

  onSubmit(event) {
    event.preventDefault();

    const { addCategory, inProgress } = this.props;
    const title = this.refs.title.value;

    if (inProgress) {
      return;
    }

    addCategory({ title });
  }

  render() {
    const { inProgress, isCreated, errorMessages, categories } = this.props;

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
          <form className="ui form" onSubmit={this.onSubmit}>
            <div className="inline field">
              <div className="ui fluid small action input">
                <input ref="title" />
                <button
                  className="ui primary button"
                  disabled={inProgress}
                  type="submit"
                >
                  Create
                </button>
              </div>
              {titleErrors}
            </div>
          </form>

          <CategoriesList categories={categories} />

        </div>
      </div>
    );
  }

}
