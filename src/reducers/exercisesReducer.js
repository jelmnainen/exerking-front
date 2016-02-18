import { EXERCISES_REQUEST, EXERCISES_REQUEST_SUCCESS, EXERCISES_REQUEST_FAILED, EXERCISES_SINGLE_REQUEST,EXERCISES_SINGLE_REQUEST_SUCCESS,EXERCISES_SINGLE_REQUEST_FAIL, EXERCISES_ADD_REQUEST,
  EXERCISES_ADD_REQUEST_SUCCESS, EXERCISES_ADD_REQUEST_FAIL , EXERCISES_ADD_RESET } from '../actions/exercisesActions';
import { LOGOUT } from '../actions/authActions';

const initialState = { 
  isFetching: false,
  isError: false,
  entries: {},
  addRequest: {},
};

const addRequest = (state, action) => {
  switch (action.type) {
  case EXERCISES_ADD_REQUEST:
    return {
      inProgress: true,
      isError: false,
    };
  case EXERCISES_ADD_REQUEST_SUCCESS:
    return {
      inProgress: false,
      isError: false,
    };
  case EXERCISES_ADD_REQUEST_FAIL:
    return {
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    };
  case EXERCISES_ADD_RESET:
    return {};
  }
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case EXERCISES_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isError: false,
    });
  case EXERCISES_REQUEST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isError: false,
      entries: payload.reduce((map, exercise) => {
        map[exercise.id] = exercise; // eslint-disable-line no-param-reassign
        return map;
      }, {}),
    });
  case EXERCISES_REQUEST_FAILED:
    return Object.assign({}, state, {
      isFetching: false,
      isError: true,
      entries: {},
    });
  case EXERCISES_SINGLE_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isError: false,
    });
  case EXERCISES_SINGLE_REQUEST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isError: false,
      entries: Object.assign({}, state.entries, {
        [payload.id]: payload,
      })
    });
  case EXERCISES_SINGLE_REQUEST_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      isError: true,
      entries: {},
    });
  case EXERCISES_ADD_REQUEST:
  case EXERCISES_ADD_REQUEST_SUCCESS:
  case EXERCISES_ADD_REQUEST_FAIL:
  case EXERCISES_ADD_RESET:
    return Object.assign({}, state, {
      addRequest: addRequest(state.addRequest, action),
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
