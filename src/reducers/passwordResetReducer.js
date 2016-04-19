import { fromJS } from 'immutable';

import { PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE,
  PASSWORD_RESET_RESET }
  from '../actions/passwordResetActions';

const initialState = fromJS({});

export default function (state = initialState, action) {
  switch (action.type) {
  case PASSWORD_RESET_REQUEST:
    return state.delete('errorMessages').merge({
      inProgress: true,
    });
  case PASSWORD_RESET_SUCCESS:
    return state.merge({
      isError: false,
      inProgress: false,
      isSuccess: true,
    });
  case PASSWORD_RESET_FAILURE:
    return state.merge({
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
  case PASSWORD_RESET_RESET:
    return initialState;
  default:
    return state;
  }
}
