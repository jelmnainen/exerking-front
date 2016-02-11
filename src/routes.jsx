import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import ExercisesContainer from './components/smart/ExercisesContainer';
import LoginContainer from './components/smart/LoginContainer';
import LogoutContainer from './components/smart/LogoutContainer';
import RegistrationContainer from './components/smart/RegistrationContainer';

export default (
  <Route path="/" component={App}>
    <Route path="exercises" component={ExercisesContainer} />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={LogoutContainer} />
    <Route path="register" component={RegistrationContainer} />
    <IndexRedirect to="/exercises" />
  </Route>
);
