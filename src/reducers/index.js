import { combineReducers } from 'redux-immutablejs';

import exercises from './exercisesReducer';
import auth from './authReducer';
import registration from './registrationReducer';
import submissions from './submissionReducer';
import users from './usersReducer';
import categories from './categoriesReducer';

export default combineReducers({
  exercises,
  auth,
  registration,
  submissions,
  users,
  categories,
});
