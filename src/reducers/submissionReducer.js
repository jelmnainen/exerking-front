import { SUBMISSIONS_ADD, SUBMISSIONS_ADD_SUCCESS, SUBMISSIONS_ADD_FAIL, SUBMISSIONS_ADD_RESET,
  SUBMISSIONS_REQUEST, SUBMISSIONS_SUCCESS,
  SUBMISSIONS_FAIL, }
  from '../actions/submissionsActions';
import { LOGOUT } from '../actions/authActions';

const initialState = {
  isFetching: false,
  isError: false,
  entries: {},
  addRequest: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
  case SUBMISSIONS_ADD:
    return Object.assign({}, state, {
      addRequest: {
        inProgress: true,
        isError: false,
      },
    });
  case SUBMISSIONS_ADD_SUCCESS:
    return Object.assign({}, state, {
      entries: Object.assign({}, state.entries, {
        [payload.id]: payload,
      }),
      addRequest: {
        inProgress: false,
        isError: false,
      },
    });
  case SUBMISSIONS_ADD_FAIL:
    return Object.assign({}, state, {
      addRequest: {
        isFetching: false,
        isError: true,
      },
    });
  case SUBMISSIONS_ADD_RESET:
    return Object.assign({}, state, {
      addRequest: {},
    });
  case SUBMISSIONS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isError: false,
    });
  case SUBMISSIONS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isError: false,
      entries: Object.assign({}, state.entries, payload.reduce((map, submission) => {
        map[submission.id] = submission; // eslint-disable-line no-param-reassign
        return map;
      }, {})),
    });
  case SUBMISSIONS_FAIL:
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
