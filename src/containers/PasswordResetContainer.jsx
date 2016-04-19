import { connect } from 'react-redux';

import { resetPassword, resetPasswordReset } from '../actions/passwordResetActions';
import PasswordResetPage from '../components/PasswordResetPage';

const mapStateToProps = (state) => ({
  form: state.get('passwordReset'),
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword(email) {
    dispatch(resetPassword(email));
  },
  onPageLeave() {
    dispatch(resetPasswordReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage);
