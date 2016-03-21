import { Map, fromJS } from 'immutable';

import { SUBMISSIONS_ADD_REQUEST, SUBMISSIONS_ADD_SUCCESS, SUBMISSIONS_ADD_FAILURE,
  SUBMISSIONS_ADD_RESET, SUBMISSIONS_REQUEST, SUBMISSIONS_SUCCESS, SUBMISSIONS_FAILURE,
  SUBMISSIONS_SINGLE_REQUEST, SUBMISSIONS_SINGLE_SUCCESS, SUBMISSIONS_SINGLE_FAILURE,
  SUBMISSIONS_UPDATE_RESET, SUBMISSIONS_UPDATE_FAILURE, SUBMISSIONS_UPDATE_REQUEST,
  SUBMISSIONS_UPDATE_SUCCESS }
  from '../actions/submissionsActions';
import { LOGOUT } from '../actions/authActions';

const emptyMap = fromJS({});

const entries = (state = emptyMap, { type, payload }) => {
  switch (type) {
  case SUBMISSIONS_ADD_SUCCESS:
  case SUBMISSIONS_SINGLE_SUCCESS:
    return state.set(payload.id, fromJS(payload));
  case SUBMISSIONS_SUCCESS:
    return state.mergeDeep(Map(payload.map(item => [item.id, fromJS(item)])));
  default:
    return state;
  }
};

const updateRequest = (state, action) => {
  switch (action.type) {
  case SUBMISSIONS_UPDATE_REQUEST:
    return state.delete('errorMessages').merge({
      inProgress: true,
      isError: false,
    });
  case SUBMISSIONS_UPDATE_FAILURE:
    return state.merge({
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
  case SUBMISSIONS_UPDATE_SUCCESS:
    return state.merge({
      inProgress: false,
      isError: false,
      isCreated: true,
    });
  case SUBMISSIONS_UPDATE_RESET:
    return emptyMap;
  default:
    return state;
  }
};

const initialState = fromJS({
  isFetching: false,
  isError: false,
  entries: {},
  addRequest: {},
  updateRequest: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
  case SUBMISSIONS_ADD_REQUEST:
    return state.merge({
      addRequest: {
        inProgress: true,
        isError: false,
      },
    });
  case SUBMISSIONS_ADD_SUCCESS:
    return state.merge({
      addRequest: {
        inProgress: false,
        isError: false,
        isCreated: true,
      },
      entries: entries(state.get('entries'), action),
    });
  case SUBMISSIONS_ADD_FAILURE:
    return state.merge({
      addRequest: {
        isFetching: false,
        isError: true,
      },
    });
  case SUBMISSIONS_ADD_RESET:
    return state.merge({
      addRequest: {},
    });
  case SUBMISSIONS_REQUEST:
  case SUBMISSIONS_SINGLE_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case SUBMISSIONS_SUCCESS:
  case SUBMISSIONS_SINGLE_SUCCESS:
    return state.merge({
      isFetching: false,
      isError: false,
      entries: entries(state.get('entries'), action),
    });
  case SUBMISSIONS_FAILURE:
  case SUBMISSIONS_SINGLE_FAILURE:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  case SUBMISSIONS_UPDATE_REQUEST:
  case SUBMISSIONS_UPDATE_FAILURE:
  case SUBMISSIONS_UPDATE_SUCCESS:
  case SUBMISSIONS_UPDATE_RESET:
    return state.merge({
      updateRequest: updateRequest(state.get('updateRequest'), action),
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
