import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import ExercisesContainer from './components/smart/ExercisesContainer';
import LoginContainer from './components/smart/LoginContainer';
import LogoutContainer from './components/smart/LogoutContainer';
import RegistrationContainer from './components/smart/RegistrationContainer';
import ExerciseSingleContainer from './components/smart/ExerciseSingleContainer';
import ExcerciseNewContainer from './components/smart/ExcerciseNewContainer';
import SubmissionsContainer from './components/smart/SubmissionsContainer';

export default (
  <Route path="/" component={App}>
    <Route path="exercises" component={ExercisesContainer} />
    <Route path="exercises/new" component={ExcerciseNewContainer} />
    <Route path="exercises/:id" component={ExerciseSingleContainer} />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={LogoutContainer} />
    <Route path="register" component={RegistrationContainer} />
    <Route path="submissions" component={SubmissionsContainer} />
    <IndexRedirect to="/exercises" />
  </Route>
);
