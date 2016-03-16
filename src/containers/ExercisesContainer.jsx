import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as exercisesActions from '../actions/exercisesActions';
import ExercisesPage from '../components/ExercisesPage';

const mapStateToProps = (state) => ({
  exercises: state.getIn(['exercises', 'entries']),
});

const mapDispatchToProps = (dispatch) => ({
  exercisesActions: bindActionCreators(exercisesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesPage);
