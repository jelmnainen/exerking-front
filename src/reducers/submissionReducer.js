import { SUBMISSIONS_ADD, SUBMISSIONS_ADD_SUCCESS, SUBMISSIONS_ADD_FAIL, SUBMISSIONS_ADD_RESET, }
  from '../actions/submissionsActions';

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
  default:
    return state;
  }
}
