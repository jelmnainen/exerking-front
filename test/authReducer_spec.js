import { expect } from 'chai';
import { fromJS } from 'immutable';

import reducer from '../src/reducers/authReducer';
import * as actions from '../src/actions/authActions.js';

describe('authReducer', () => {
  const emptyState = fromJS({});
  const initialState = fromJS({
    isSignedIn: false,
  });

  it('initializes state correctly', () => {
    const nextState = reducer(undefined, {});
    expect(nextState).to.eql(initialState);
  });

  it('returns state correctly with unrecognized type', () => {
    const previousState = 42;
    const nextState = reducer(previousState, {});
    expect(nextState).to.equal(previousState);
  });

  it('login request starts correctly', () => {
    const action = {
      type: actions.LOGIN_REQUEST,
    };
    const expectedState = fromJS({
      isSignedIn: false,
      inProgress: true,
    });
    const nextState = reducer(emptyState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('login request success updates state correctly', () => {
    const payload = {
      email: 'user@example.com',
      teacher: false,
      id: 42,
      access_token: '42:deadbeef',
    };
    const action = {
      type: actions.LOGIN_REQUEST_SUCCESS,
      payload,
    };
    const expectedState = fromJS({
      isSignedIn: true,
      id: payload.id,
      email: payload.email,
      token: payload.access_token,
      isTeacher: payload.teacher,
    });
    const nextState = reducer(emptyState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('login request fail updates state correctly', () => {
    const action = {
      type: actions.LOGIN_REQUEST_FAIL,
      errors: {
        email: ['message'],
      },
    };
    const expectedState = fromJS({
      isSignedIn: false,
      isError: true,
      errorMessages: action.errors,
    });
    const nextState = reducer(emptyState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('logout updates state correctly', () => {
    const action = {
      type: actions.LOGOUT,
    };
    const previousState = fromJS({
      isSignedIn: true,
      id: 42,
      email: 'user@example.com',
      token: '42:deadbeef',
    });
    const nextState = reducer(previousState, action);
    expect(nextState).to.eql(initialState);
  });
});
