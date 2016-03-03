import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as submissionsActions from '../../actions/submissionsActions';
import SubmissionsPage from '../SubmissionsPage';

const mapStateToProps = (state) => ({
  submissions: state.submissions.entries,
});

const mapDispatchToProps = (dispatch) => ({
  submissionsActions: bindActionCreators(submissionsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
