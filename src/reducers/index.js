import exercisesReducer from './exercisesReducer';
import authReducer from './authReducer';

export default function (state = {}, action) {
  return {
    exercises: exercisesReducer(state.exercises, action),
    auth: authReducer(state.auth, action),
  };
}
