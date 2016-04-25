import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import reducer from '../src/reducers/submissionReducer';
import { SUBMISSIONS_ADD_REQUEST, SUBMISSIONS_ADD_SUCCESS, SUBMISSIONS_ADD_FAILURE,
  SUBMISSIONS_ADD_RESET, SUBMISSIONS_REQUEST, SUBMISSIONS_SUCCESS, SUBMISSIONS_FAILURE,
  SUBMISSIONS_SINGLE_REQUEST, SUBMISSIONS_SINGLE_SUCCESS, SUBMISSIONS_SINGLE_FAILURE,
  SUBMISSIONS_UPDATE_RESET, SUBMISSIONS_UPDATE_FAILURE, SUBMISSIONS_UPDATE_REQUEST,
  SUBMISSIONS_UPDATE_SUCCESS, SUBMISSIONS_SET_FILTER }
  from '../src/actions/submissionsActions';
import { FILTER_ALL }
  from '../src/constants/submissionsConstants';
import { LOGOUT } from '../src/actions/authActions';

describe('SumbmissionReducer', () => {
  const initialState = fromJS({
    isFetching: false,
    isError: false,
    entries: {},
    addRequest: {},
    updateRequest: {},
    filter: FILTER_ALL,
  });
  const entries = (state = fromJS({}), { type, payload }) => {
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

  it('Displays that add request is in progress', () => {
    const expectedState = initialState.merge({
      addRequest: {
        inProgress: true,
        isError: false,
      },
    });
    const action = {
      type: SUBMISSIONS_ADD_REQUEST,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Adds submission succesfully', () => {
    const action = {
      type: SUBMISSIONS_ADD_SUCCESS,
      payload: {},
    };
    const expectedState = initialState.merge({
      addRequest: {
        inProgress: false,
        isError: false,
        isCreated: true,
      },
      entries: entries(new Map(), action),
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Notifies submission add failure', () => {
    const action = {
      type: SUBMISSIONS_ADD_FAILURE,
    };
    const expectedState = initialState.merge({
      addRequest: {
        isFetching: false,
        isError: true,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Resets add request', () => {
    const action = {
      type: SUBMISSIONS_ADD_RESET,
    };
    const testState = initialState.merge({
      addRequest: {
        isFetching: true,
        isError: false,
      },
    });
    const nextState = reducer(testState, action);
    expect(nextState).to.equal(initialState);
  });

  it('Single submission request', () => {
    const action = {
      type: SUBMISSIONS_SINGLE_REQUEST,
    };
    const expectedState = initialState.merge({
      isFetching: true,
      isError: false,
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Submission request', () => {
    const action = {
      type: SUBMISSIONS_REQUEST,
    };
    const expectedState = initialState.merge({
      isFetching: true,
      isError: false,
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Submission request failure', () => {
    const action = {
      type: SUBMISSIONS_FAILURE,
    };
    const expectedState = initialState.merge({
      isFetching: false,
      isError: true,
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Single submission request failure', () => {
    const action = {
      type: SUBMISSIONS_SINGLE_FAILURE,
    };
    const expectedState = initialState.merge({
      isFetching: false,
      isError: true,
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Single submission request success', () => {
    const action = {
      type: SUBMISSIONS_SINGLE_SUCCESS,
      payload: {},
    };
    const expectedState = initialState.merge({
      isFetching: false,
      isError: false,
      entries: entries(new Map(), action),
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Submission update request', () => {
    const action = {
      type: SUBMISSIONS_UPDATE_REQUEST,
    };
    const expectedState = initialState.merge({
      updateRequest: {
        inProgress: true,
        isError: false,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('submissions update request failure', () => {
    const action = {
      type: SUBMISSIONS_UPDATE_FAILURE,
      payload: {},
    };
    const expectedState = initialState.merge({
      updateRequest: {
        inProgress: false,
        isError: true,
        errorMessages: action.payload,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Submissions update request success', () => {
    const action = {
      type: SUBMISSIONS_UPDATE_SUCCESS,
    };
    const expectedState = initialState.merge({
      updateRequest: {
        inProgress: false,
        isError: false,
        isCreated: true,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Resets submission update', () => {
    const action = {
      type: SUBMISSIONS_UPDATE_RESET,
    };
    const expectedState = initialState.merge({
      updateRequest: fromJS({}),
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Changes submission filter', () => {
    const action = {
      type: SUBMISSIONS_SET_FILTER,
      payload: 'TYPE',
    };
    const expectedState = initialState.merge({
      filter: 'TYPE',
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(expectedState);
  });

  it('Logs out', () => {
    const action = {
      type: LOGOUT,
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(initialState);
  });
  it('Returns state on unfamiliar type', () => {
    const action = {
      type: 'TROLOLOLOLOL',
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(initialState);
  });
});
