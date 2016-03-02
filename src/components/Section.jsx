import { Component, PropTypes } from 'react';

export default class Section extends Component {

  render() {
    const { visible, children } = this.props;
    if (visible) {
      return children;
    }
    return null;
  }

}

Section.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
};
