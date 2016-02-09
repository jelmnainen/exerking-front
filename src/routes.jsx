import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import ExercisesContainer from './components/smart/ExercisesContainer';
import LoginContainer from './components/smart/LoginContainer';

export default (
  <Route path="/" component={App}>
    <Route path="exercises" component={ExercisesContainer} />
    <Route path="login" component={LoginContainer} />
    <IndexRedirect to="/exercises" />
  </Route>
);
