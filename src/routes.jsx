import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import ExercisesContainer from './components/smart/ExercisesContainer';

export default (
  <Route path="/" component={App}>
    <Route path="exercises" component={ExercisesContainer} />
    <IndexRedirect to="/exercises" />
  </Route>
);
