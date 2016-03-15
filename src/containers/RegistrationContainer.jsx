import { connect } from 'react-redux';

import { register, resetRegistration } from '../actions/registrationActions';
import RegistrationPage from '../components/RegistrationPage';

const mapStateToProps = (state) => ({
  reg: state.get('registration'),
});

const mapDispatchToProps = (dispatch) => ({
  onRegistration(email, password, passwordConfirmation) {
    dispatch(register(email, password, passwordConfirmation));
  },
  onPageLeave() {
    dispatch(resetRegistration());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
