import { USERS_REQUEST, USERS_SUCCESS, USERS_FAIL } from '../actions/usersActions';
import { LOGOUT } from '../actions/authActions';

const initialState = {
  isFetching: false,
  isError: false,
  entries: {},
};

const entries = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
  case USERS_SUCCESS:
    return payload.reduce((map, user) => {
      map[user.id] = user; // eslint-disable-line no-param-reassign
      return map;
    }, {});
  default:
    return state;
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
  case USERS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isError: false,
    });
  case USERS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isError: false,
      entries: entries(state.entries, action),
    });
  case USERS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      isError: true,
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
