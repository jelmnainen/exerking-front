import { Map, fromJS } from 'immutable';

import { USERS_REQUEST, USERS_SUCCESS, USERS_FAIL } from '../actions/usersActions';
import { LOGOUT } from '../actions/authActions';

const initialState = fromJS({
  isFetching: false,
  isError: false,
  entries: new Map(),
});

export default function (state = initialState, action) {
  switch (action.type) {
  case USERS_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case USERS_SUCCESS:
    return state.mergeDeep({
      isFetching: false,
      isError: false,
      entries: new Map(action.payload.map(item => [item.id, fromJS(item)])),
    });
  case USERS_FAIL:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
