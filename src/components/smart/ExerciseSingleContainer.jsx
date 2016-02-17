import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as exercisesActions from '../../actions/exercisesActions';
import ExerciseSingleView from '../ExerciseSingleView';

const mapStateToProps = (state, props) => ({
  exercise: state.exercises[props.params.id],
});

const mapDispatchToProps = (dispatch) => ({
  exercisesActions: bindActionCreators(exercisesActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSingleView);
