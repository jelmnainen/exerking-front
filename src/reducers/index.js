import exercisesReducer from './exercisesReducer';

export default function (state = {}, action) {

  return {
  	exercises: exercisesReducer(state.exercises, action)
  };
}
