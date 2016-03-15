import { connect } from 'react-redux';

import Section from '../components/Section';

const mapStateToProps = (state) => ({
  visible: state.getIn(['auth', 'isTeacher'], false),
});

export default connect(mapStateToProps, null, null, { pure: false })(Section);
