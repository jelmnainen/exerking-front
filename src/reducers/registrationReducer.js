import { REGISTRATION_REQUEST, REGISTRATION_REQUEST_SUCCESS,
  REGISTRATION_REQUEST_FAIL, RESET_REGISTRATION, }
  from '../actions/registrationActions';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
  case REGISTRATION_REQUEST:
    return {
      isError: false,
      inProgress: true,
    };
  case REGISTRATION_REQUEST_SUCCESS:
    return {
      inProgress: false,
      isError: false,
      isOK: true,
    };
  case REGISTRATION_REQUEST_FAIL:
    return {
      inProgress: false,
      isError: true,
      errorMessages: action.errors,
    };
  case RESET_REGISTRATION:
    const newState = state;
    newState.isOK = false;
    return newState;
  default:
    return state;
  }
};
