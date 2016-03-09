import { connect } from 'react-redux';
import Section from '../Section';

const mapStateToProps = (state) => ({
  visible: state.auth.isSignedIn && !state.auth.isTeacher,
});

export default connect(mapStateToProps, null, null, { pure: false })(Section);
