import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAIL, LOGOUT, }
  from '../actions/authActions.js';

const initialState = {
  isSignedIn: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case LOGIN_REQUEST:
    return {
      isSignedIn: false,
      inProgress: true,
    };
  case LOGIN_REQUEST_SUCCESS:
    return {
      isSignedIn: true,
      email: action.payload.email,
      token: action.payload.access_token,
    };
  case LOGIN_REQUEST_FAIL:
    return {
      isSignedIn: false,
      isError: true,
    };
  case LOGOUT:
    return {
      isSignedIn: false,
    };
  default:
    return state;
  }
}
