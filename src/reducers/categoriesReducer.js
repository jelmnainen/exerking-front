import { Map, fromJS } from 'immutable';

import { CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_FAILURE,
  CATEGORIES_ADD_REQUEST, CATEGORIES_ADD_SUCCESS, CATEGORIES_ADD_FAILURE,
  CATEGORIES_ADD_RESET, CATEGORIES_DELETE_REQUEST, CATEGORIES_DELETE_SUCCESS,
  CATEGORIES_DELETE_FAILURE }
  from '../actions/categoriesActions';

const emptyMap = fromJS({});

const entries = (state = emptyMap, action) => {
  const { payload } = action;
  switch (action.type) {
  case CATEGORIES_SUCCESS:
    return state.merge(Map(payload.map(item => [item.id, fromJS(item)])));
  case CATEGORIES_ADD_SUCCESS:
    return state.set(payload.id, fromJS(payload));
  case CATEGORIES_DELETE_SUCCESS:
    return state.filter(category => category.get('id') !== payload.id);
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

const addRequest = (state = emptyMap, action) => {
  switch (action.type) {
  case CATEGORIES_ADD_REQUEST:
    return state.delete('errorMessages').merge({
      inProgress: true,
      isError: false,
    });
  case CATEGORIES_ADD_SUCCESS:
    return state.merge({
      inProgress: false,
      isError: false,
      isCreated: true,
    });
  case CATEGORIES_ADD_FAILURE:
    return state.merge({
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
  case CATEGORIES_ADD_RESET:
    return emptyMap;
  default:
    return state;
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
  case CATEGORIES_REQUEST:
  case CATEGORIES_DELETE_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case CATEGORIES_SUCCESS:
  case CATEGORIES_DELETE_SUCCESS:
    return state.merge({
      isFetching: false,
      isError: false,
      entries: entries(state.get('entries'), action),
    });
  case CATEGORIES_FAILURE:
  case CATEGORIES_DELETE_FAILURE:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  case CATEGORIES_ADD_SUCCESS:
    return state.merge({
      entries: entries(state.get('entries'), action),
      addRequest: addRequest(state.get('addRequest'), action),
    });
  case CATEGORIES_ADD_REQUEST:
  case CATEGORIES_ADD_FAILURE:
  case CATEGORIES_ADD_RESET:
    return state.merge({
      addRequest: addRequest(state.get('addRequest'), action),
    });
  default:
    return state;
  }
}
