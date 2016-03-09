import { connect } from 'react-redux';
import Section from '../Section';

const mapStateToProps = (state) => {
  const auth = state.get('auth');
  return {
    visible: !auth.get('isTeacher', false),
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(Section);
