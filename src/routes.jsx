import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import ExercisesContainer from './containers/ExercisesContainer';
import LoginContainer from './containers/LoginContainer';
import LogoutContainer from './containers/LogoutContainer';
import RegistrationContainer from './containers/RegistrationContainer';
import ExerciseSingleContainer from './containers/ExerciseSingleContainer';
import ExercisesEditContainer from './containers/ExercisesEditContainer';
import ExerciseNewContainer from './containers/ExerciseNewContainer';
import SubmissionsContainer from './containers/SubmissionsContainer';
import UserSubmissionsContainer from './containers/UserSubmissionsContainer';
import SubmissionsSingleContainer from './containers/SubmissionsSingleContainer';
import CategoriesContainer from './containers/CategoriesContainer';
import BatchesNewContainer from './containers/BatchesNewContainer';
import BatchesEditContainer from './containers/BatchesEditContainer';
import SupportPage from './components/SupportPage';
import TeacherVisualizationContainer from './containers/TeacherVisualizationContainer';
import PasswordResetContainer from './containers/PasswordResetContainer';

export default (
  <Route path="/" component={App}>
    <Route path="exercises" component={ExercisesContainer} />
    <Route path="exercises/new" component={ExerciseNewContainer} />
    <Route path="exercises/:id" component={ExerciseSingleContainer} />
    <Route path="exercises/:id/edit" component={ExercisesEditContainer} />
    <Route path="login" component={LoginContainer} />
    <Route path="logout" component={LogoutContainer} />
    <Route path="register" component={RegistrationContainer} />
    <Route path="submissions" component={SubmissionsContainer} />
    <Route path="me/submissions" component={UserSubmissionsContainer} />
    <Route path="submissions/:id" component={SubmissionsSingleContainer} />
    <Route path="categories" component={CategoriesContainer} />
    <Route path="sets/new" component={BatchesNewContainer} />
    <Route path="sets/:id/edit" component={BatchesEditContainer} />
    <Route path="support" component={SupportPage} />
    <Route path="stats" component={TeacherVisualizationContainer} />
    <Route path="password-reset" component={PasswordResetContainer} />
    <IndexRedirect to="/exercises" />
  </Route>
);
