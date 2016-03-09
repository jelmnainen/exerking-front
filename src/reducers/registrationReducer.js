import { fromJS } from 'immutable';

import { REGISTRATION_REQUEST, REGISTRATION_REQUEST_SUCCESS,
  REGISTRATION_REQUEST_FAIL, REGISTRATION_RESET, }
  from '../actions/registrationActions';

const initialState = fromJS({
});

export default (state = initialState, action) => {
  switch (action.type) {
  case REGISTRATION_REQUEST:
    return state.merge({
      isError: false,
      inProgress: true,
      errorMessages: undefined,
    });
  case REGISTRATION_REQUEST_SUCCESS:
    return state.merge({
      inProgress: false,
      isError: false,
      isOK: true,
    });
  case REGISTRATION_REQUEST_FAIL:
    return state.merge({
      inProgress: false,
      isError: true,
      errorMessages: action.errors,
    });
  case REGISTRATION_RESET:
    return initialState;
  default:
    return state;
  }
};
