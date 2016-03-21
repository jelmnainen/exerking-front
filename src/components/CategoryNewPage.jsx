import React, { Component } from 'react';

export default class CategoryNewPage extends Component {

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
          <h2 className="ui header">Add new category</h2>
          {created}
          <form className="ui form" onSubmit={this.onSubmit}>
            <div className="inline field">
              <input ref="title" />
              <button
                className="ui primary button"
                disabled={inProgress}
                type="submit"
              >
                Add Category
              </button>
            </div>
            {titleErrors}
          </form>

          <h2 className="ui header">Categories</h2>
          <table className="ui single line compact table">
            <tbody>

              {categories.valueSeq().map(category =>
                <tr>
                  <td>
                    {category.get('title')}
                  </td>
                  <td className="right aligned collapsing">

                    <button className="ui mini basic grey compact button">
                      Edit
                    </button>
                    <button className="ui mini basic red compact button">
                      Delete
                    </button>

                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}
