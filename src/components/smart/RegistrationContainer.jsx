import { connect } from 'react-redux';

import { register } from '../../actions/registrationActions';
import RegistrationPage from '../RegistrationPage';

const mapStateToProps = (state) => ({
  reg: state.registration,
});

const mapDispatchToProps = (dispatch) => ({
  onRegistration: (email, password) => dispatch(register(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
