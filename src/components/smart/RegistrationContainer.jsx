import { connect } from 'react-redux';

import { register, resetRegistration } from '../../actions/registrationActions';
import RegistrationPage from '../RegistrationPage';

const mapStateToProps = (state) => ({
  reg: state.registration,
});

const mapDispatchToProps = (dispatch) => ({
  onRegistration: (email, password) => dispatch(register(email, password)),
  onPageLeave: () => dispatch(resetRegistration()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
