import { Map, fromJS } from 'immutable';

import { EXERCISES_REQUEST, EXERCISES_SUCCESS, EXERCISES_FAILURE,
  EXERCISES_SINGLE_REQUEST, EXERCISES_SINGLE_SUCCESS, EXERCISES_SINGLE_FAILURE,
  EXERCISES_ADD_REQUEST, EXERCISES_ADD_SUCCESS, EXERCISES_ADD_FAILURE,
  EXERCISES_ADD_RESET,
  EXERCISES_DELETE_REQUEST, EXERCISES_DELETE_SUCCESS, EXERCISES_DELETE_FAILURE,
  EXERCISES_UPDATE_REQUEST, EXERCISES_UPDATE_SUCCESS, EXERCISES_UPDATE_FAILURE,
  EXERCISES_UPDATE_RESET,
} from '../actions/exercisesActions';
import { LOGOUT } from '../actions/authActions';

const emptyMap = fromJS({});

const form = (state = emptyMap, action) => {
  switch (action.type) {
  case EXERCISES_ADD_REQUEST:
  case EXERCISES_UPDATE_REQUEST:
    return state.delete('errorMessages').merge({
      inProgress: true,
      isError: false,
    });
  case EXERCISES_ADD_SUCCESS:
  case EXERCISES_UPDATE_SUCCESS:
    return state.merge({
      inProgress: false,
      isError: false,
      isCreated: true,
    });
  case EXERCISES_ADD_FAILURE:
  case EXERCISES_UPDATE_FAILURE:
    return state.merge({
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
  case EXERCISES_ADD_RESET:
  case EXERCISES_UPDATE_RESET:
    return emptyMap;
  default:
    return state;
  }
};

const entries = (state = emptyMap, action) => {
  const { payload } = action;
  switch (action.type) {
  case EXERCISES_SUCCESS:
    return state.merge(Map(payload.map(item => [item.id, fromJS(item)])));
  case EXERCISES_ADD_SUCCESS:
  case EXERCISES_SINGLE_SUCCESS:
  case EXERCISES_UPDATE_SUCCESS:
    return state.set(payload.id, fromJS(payload));
  case EXERCISES_DELETE_SUCCESS:
    return state.delete(payload.id);
  default:
    return state;
  }
};

const initialState = fromJS({
  isFetching: false,
  isError: false,
  entries: {},
  addRequest: {},
  updateForm: {},
});

export default function (state = initialState, action) {
  const { type } = action;

  switch (type) {
  case EXERCISES_REQUEST:
  case EXERCISES_SINGLE_REQUEST:
  case EXERCISES_DELETE_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case EXERCISES_SUCCESS:
  case EXERCISES_SINGLE_SUCCESS:
  case EXERCISES_DELETE_SUCCESS:
    return state.merge({
      isFetching: false,
      isError: false,
      entries: entries(state.get('entries'), action),
    });
  case EXERCISES_FAILURE:
  case EXERCISES_SINGLE_FAILURE:
  case EXERCISES_DELETE_FAILURE:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  case EXERCISES_ADD_SUCCESS:
    return state.merge({
      entries: entries(state.get('entries'), action),
      addRequest: form(state.get('addRequest'), action),
    });
  case EXERCISES_UPDATE_SUCCESS:
    return state.merge({
      entries: entries(state.get('entries'), action),
      updateForm: form(state.get('updateForm'), action),
    });
  case EXERCISES_ADD_REQUEST:
  case EXERCISES_ADD_FAILURE:
  case EXERCISES_ADD_RESET:
    return state.merge({
      addRequest: form(state.get('addRequest'), action),
    });
  case EXERCISES_UPDATE_RESET:
  case EXERCISES_UPDATE_FAILURE:
  case EXERCISES_UPDATE_REQUEST:
    return state.merge({
      updateForm: form(state.get('updateForm'), action),
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
