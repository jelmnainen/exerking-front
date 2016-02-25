import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

export default class FormInput extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const { children, type, required, name, errors, value } = this.props;
    let error;

    if (errors && errors.length) {
      error = (
        <div className="ui pointing red basic label">
          {errors.join(', ')}
        </div>
      );
    }

    return (
      <div className={cn('field', { required, error })}>
        <label>{children}</label>
        <input ref="input" type={type} name={name} value={value} onChange={this.onChange} />
        {error}
      </div>
    );
  }

}

FormInput.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

FormInput.defaultProps = {
  type: 'text',
  required: true,
};
