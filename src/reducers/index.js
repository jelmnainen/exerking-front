import exercisesReducer from './exercisesReducer';
import authReducer from './authReducer';
import registrationReducer from './registrationReducer';

export default function (state = {}, action) {
  return {
    exercises: exercisesReducer(state.exercises, action),
    auth: authReducer(state.auth, action),
    registration: registrationReducer(state.registration, action),
  };
}
