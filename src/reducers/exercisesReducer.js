import { Map, fromJS } from 'immutable';

import { EXERCISES_REQUEST, EXERCISES_REQUEST_SUCCESS, EXERCISES_REQUEST_FAILED,
  EXERCISES_SINGLE_REQUEST, EXERCISES_SINGLE_REQUEST_SUCCESS, EXERCISES_SINGLE_REQUEST_FAIL,
  EXERCISES_ADD_REQUEST, EXERCISES_ADD_REQUEST_SUCCESS, EXERCISES_ADD_REQUEST_FAIL,
  EXERCISES_ADD_RESET } from '../actions/exercisesActions';
import { LOGOUT } from '../actions/authActions';

const emptyMap = fromJS({});

const addRequest = (state = emptyMap, action) => {
  switch (action.type) {
  case EXERCISES_ADD_REQUEST:
    return state.merge({
      inProgress: true,
      isError: false,
    });
  case EXERCISES_ADD_REQUEST_SUCCESS:
    return state.merge({
      inProgress: false,
      isError: false,
      isCreated: true,
    });
  case EXERCISES_ADD_REQUEST_FAIL:
    return state.merge({
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
  case EXERCISES_ADD_RESET:
    return emptyMap;
  default:
    return state;
  }
};

const entries = (state = emptyMap, action) => {
  const { payload } = action;
  switch (action.type) {
  case EXERCISES_REQUEST_SUCCESS:
    return state.merge(new Map(payload.map(item => [item.id, fromJS(item)])));
  case EXERCISES_ADD_REQUEST_SUCCESS:
  case EXERCISES_SINGLE_REQUEST_SUCCESS:
    return state.set(payload.id, fromJS(payload));
  default:
    return state;
  }
};

const initialState = fromJS({
  isFetching: false,
  isError: false,
  entries: {},
  addRequest: {},
});

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
  case EXERCISES_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case EXERCISES_REQUEST_SUCCESS:
    return state.mergeDeep({
      isFetching: false,
      isError: false,
      entries: entries(state.get('entries'), action),
    });
  case EXERCISES_REQUEST_FAILED:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  case EXERCISES_SINGLE_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case EXERCISES_SINGLE_REQUEST_SUCCESS:
    return state.merge({
      isFetching: false,
      isError: false,
      entries: entries(state.get('entries'), action),
    });
  case EXERCISES_SINGLE_REQUEST_FAIL:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  case EXERCISES_ADD_REQUEST_SUCCESS:
    return state.merge({
      entries: entries(state.get('entries'), action),
      addRequest: addRequest(state.get('addRequest'), action),
    });
  case EXERCISES_ADD_REQUEST:
  case EXERCISES_ADD_REQUEST_FAIL:
  case EXERCISES_ADD_RESET:
    return state.merge({
      addRequest: addRequest(state.get('addRequest'), action),
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
