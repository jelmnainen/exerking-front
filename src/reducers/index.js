import { combineReducers } from 'redux-immutablejs';

import exercises from './exercisesReducer';
import auth from './authReducer';
import registration from './registrationReducer';
import submissions from './submissionReducer';
import users from './usersReducer';
import categories from './categoriesReducer';
import batches from './batchesReducer';
import passwordReset from './passwordResetReducer';

export default combineReducers({
  exercises,
  auth,
  registration,
  submissions,
  users,
  categories,
  batches,
  passwordReset,
});
