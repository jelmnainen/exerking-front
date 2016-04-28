import { fromJS } from 'immutable';

import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAIL, LOGOUT }
  from '../actions/authActions.js';

const initialState = fromJS({
  isSignedIn: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return state.delete('errorMessages').merge({
      isSignedIn: false,
      inProgress: true,
    });
  case LOGIN_REQUEST_SUCCESS:
    return state.merge({
      isSignedIn: true,
      isError: false,
      inProgress: false,
      id: action.payload.id,
      email: action.payload.email,
      token: action.payload.access_token,
      isTeacher: action.payload.teacher,
    });
  case LOGIN_REQUEST_FAIL:
    return state.merge({
      isSignedIn: false,
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
