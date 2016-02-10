import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import LogoutPage from '../LogoutPage';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
