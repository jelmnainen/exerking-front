import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions/authActions';
import LoginPage from '../LoginPage';

const mapStateToProps = (state) => ({
  auth: state.get('auth'),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
