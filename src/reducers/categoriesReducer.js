import { Map, fromJS } from 'immutable';

import { CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_FAILURE }
  from '../actions/categoriesActions';

const emptyMap = fromJS({});

const entries = (state = emptyMap, action) => {
  const { payload } = action;
  switch (action.type) {
  case CATEGORIES_SUCCESS:
    return state.merge(Map(payload.map(item => [item.id, fromJS(item)])));
  default:
    return state;
  }
};

const initialState = fromJS({
  isFetching: false,
  isError: false,
  entries: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
  case CATEGORIES_REQUEST:
    return state.merge({
      isFetching: true,
      isError: false,
    });
  case CATEGORIES_SUCCESS:
    return state.merge({
      isFetching: false,
      isError: false,
      entries: entries(state.get('entries'), action),
    });
  case CATEGORIES_FAILURE:
    return state.merge({
      isFetching: false,
      isError: true,
    });
  default:
    return state;
  }
}
