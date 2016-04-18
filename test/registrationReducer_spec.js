import { expect } from 'chai';
import { fromJS } from 'immutable';

import reducer from '../src/reducers/registrationReducer';
import * as actions from '../src/actions/registrationActions.js';

describe('registrationReducer', () => {
  const emptyState = fromJS({});
  const initialState = emptyState;

  it('returns initial state', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).to.eql(initialState);
  });

  it('returns state correctly with unrecognized type', () => {
    const previousState = 42;
    const nextState = reducer(previousState, {});
    expect(nextState).to.equal(previousState);
  });

  it('registration request starts correctly', () => {
    const action = {
      type: actions.REGISTRATION_REQUEST,
    };
    const expectedState = fromJS({
      inProgress: true,
      isError: false,
    });
    const nextState = reducer(emptyState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('registration request success updates state correctly', () => {
    const action = {
      type: actions.REGISTRATION_REQUEST_SUCCESS,
    };
    const expectedState = fromJS({
      inProgress: false,
      isError: false,
      isOK: true,
    });
    const nextState = reducer(emptyState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('registration request fail updates state correctly', () => {
    const action = {
      type: actions.REGISTRATION_REQUEST_FAIL,
      payload: {
        email: ['message'],
      },
    };
    const expectedState = fromJS({
      inProgress: false,
      isError: true,
      errorMessages: action.payload,
    });
    const nextState = reducer(undefined, action);
    expect(nextState).to.eql(expectedState);
  });
});
