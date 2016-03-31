import { Map, fromJS } from 'immutable';

import { BATCHES_REQUEST, BATCHES_SUCCESS, BATCHES_FAILURE,
  BATCHES_DELETE_REQUEST, BATCHES_DELETE_SUCCESS, BATCHES_DELETE_FAILURE,
  BATCHES_ADD_REQUEST, BATCHES_ADD_SUCCESS, BATCHES_ADD_FAILURE,
  BATCHES_ADD_RESET, BATCHES_UPDATE_REQUEST, BATCHES_UPDATE_SUCCESS,
  BATCHES_UPDATE_FAILURE, BATCHES_UPDATE_RESET,
  BATCHES_SINGLE_REQUEST, BATCHES_SINGLE_SUCCESS, BATCHES_SINGLE_FAILURE }
  from '../actions/batchesActions';

import { LOGOUT } from '../actions/authActions';

const initialState = fromJS({
  isFetching: false,
  isError: false,
  entries: {},
  forms: {
    add: {},
    update: {},
  },
});

const emptyMap = fromJS({});

const entries = (state, action) => {
  const { payload } = action;
  switch (action.type) {
  case BATCHES_SUCCESS:
    return state.merge(Map(payload.map(item => [item.id, fromJS(item)])));
  case BATCHES_ADD_SUCCESS:
  case BATCHES_UPDATE_SUCCESS:
  case BATCHES_SINGLE_SUCCESS:
    return state.set(payload.id, fromJS(payload));
  case BATCHES_DELETE_SUCCESS:
    return state.filter(batch => batch.get('id') !== payload.id);
  default:
    return state;
  }
};

const add = (state = emptyMap, action) => {
  switch (action.type) {
  case BATCHES_ADD_REQUEST:
    return state.delete('errorMessages').merge({
      inProgress: true,
      isError: false,
    });
  case BATCHES_ADD_SUCCESS:
    return state.merge({
      inProgress: false,
      isError: false,
      isSuccess: true,
    });
  case BATCHES_ADD_FAILURE:
    return state.merge({
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
  case BATCHES_ADD_RESET:
    return emptyMap;
  default:
    return state;
  }
};

const update = (state = emptyMap, action) => {
  switch (action.type) {
  case BATCHES_UPDATE_REQUEST:
    return state.delete('errorMessages').merge({
      inProgress: true,
      isError: false,
    });
  case BATCHES_UPDATE_SUCCESS:
    return state.merge({
      inProgress: false,
      isError: false,
      isSuccess: true,
    });
  case BATCHES_UPDATE_FAILURE:
    return state.merge({
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
  case BATCHES_UPDATE_RESET:
    return emptyMap;
  default:
    return state;
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
  case BATCHES_REQUEST:
  case BATCHES_DELETE_REQUEST:
  case BATCHES_SINGLE_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case BATCHES_SUCCESS:
  case BATCHES_DELETE_SUCCESS:
  case BATCHES_SINGLE_SUCCESS:
    return state.merge({
      isFetching: false,
      isError: false,
      entries: entries(state.get('entries'), action),
    });
  case BATCHES_FAILURE:
  case BATCHES_DELETE_FAILURE:
  case BATCHES_SINGLE_FAILURE:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  case BATCHES_ADD_SUCCESS:
  case BATCHES_UPDATE_SUCCESS:
    return state.merge({
      entries: entries(state.get('entries'), action),
      forms: {
        add: add(state.getIn(['forms', 'add']), action),
        update: update(state.getIn(['forms', 'add']), action),
      },
    });
  case BATCHES_ADD_REQUEST:
  case BATCHES_ADD_FAILURE:
  case BATCHES_ADD_RESET:
  case BATCHES_UPDATE_REQUEST:
  case BATCHES_UPDATE_FAILURE:
  case BATCHES_UPDATE_RESET:
    return state.merge({
      forms: {
        add: add(state.getIn(['forms', 'add']), action),
        update: update(state.getIn(['forms', 'update']), action),
      },
    });
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}
