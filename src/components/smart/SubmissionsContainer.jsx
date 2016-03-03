import { connect } from 'react-redux';

import { fetchAllSubmissions } from '../../actions/submissionsActions';
import { fetchExercises } from '../../actions/exercisesActions';
import SubmissionsPage from '../SubmissionsPage';

const mapStateToProps = (state) => ({
  submissions: state.submissions.entries,
  exercises: state.exercises.entries,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllSubmissions: () => dispatch(fetchAllSubmissions()),
  fetchExercises: () => dispatch(fetchExercises()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionsPage);
