import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as exercisesActions from '../../actions/exercisesActions';
import ExercisesPage from '../ExercisesPage';

const mapStateToProps = (state) => ({
  exercises: state.exercises,
});

const mapDispatchToProps = (dispatch) => ({
  exercisesActions: bindActionCreators(exercisesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesPage);
