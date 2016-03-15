import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import ExercisesContainer from './containers/ExercisesContainer';
import LoginContainer from './containers/LoginContainer';
import LogoutContainer from './containers/LogoutContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import ExerciseSingleContainer from './containers/ExerciseSingleContainer';
import ExcerciseNewContainer from './containers/ExcerciseNewContainer';
import SubmissionsContainer from './containers/SubmissionsContainer';
import UserSubmissionsContainer from './containers/UserSubmissionsContainer';
import SubmissionsSingleContainer from './containers/SubmissionsSingleContainer';

export default (
  <Route path="/" component={App}>
    <Route path="exercises" component={ExercisesContainer} />
    <Route path="exercises/new" component={ExcerciseNewContainer} />
    <Route path="exercises/:id" component={ExerciseSingleContainer} />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={LogoutContainer} />
    <Route path="register" component={RegistrationContainer} />
    <Route path="submissions" component={SubmissionsContainer} />
    <Route path="me/submissions" component={UserSubmissionsContainer} />
    <Route path="submissions/:id" component={SubmissionsSingleContainer} />
    <IndexRedirect to="/exercises" />
  </Route>
);
