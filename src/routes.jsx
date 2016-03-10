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
<<<<<<< 83f9844c954bcde6497695e096a84ccc3027a429
import UserSubmissionsContainer from './components/smart/UserSubmissionsContainer';
=======
import SubmissionsSingleContainer from './components/smart/SubmissionsSingleContainer.jsx';
>>>>>>> feedback handling to submission

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
