import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

export default class CategoriesListEditFormItem extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.props.form.inProgress) {
      return;
    }

    const id = this.props.category.get('id');
    const title = this.refs.title.value;

    this.props.onSubmit(id, { title });
  }

  render() {
    const { category, form: { errorMessages } } = this.props;
    return (
      <tr>
        <td colSpan="2">
          <form onSubmit={this.onSubmit}>
            <div className="inline field">
              <div
                className={cn(
                  'ui fluid small action input',
                  {
                    error: errorMessages && errorMessages.get('title'),
                  }
                )}
              >
                <input ref="title" defaultValue={category.get('title')} />
                <button
                  className="ui small button"
                  type="button"
                  onClick={this.props.onCancelClick}
                >
                  Cancel
                </button>
                <button
                  className="ui small primary button"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </td>
      </tr>
    );
  }
}

CategoriesListEditFormItem.propTypes = {
  category: PropTypes.object.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};
