import { expect } from 'chai';

import reducer from '../src/reducers/authReducer';
import * as actions from '../src/actions/authActions.js';

describe('authReducer', () => {
  it('initializes state correctly', () => {
    const initialState = {
      isSignedIn: false,
    };
    const nextState = reducer(undefined, {});
    expect(nextState).to.eql(initialState);
  });

  it('login request starts correctly', () => {
    const expectedState = {
      isSignedIn: false,
      inProgress: true,
    };
    const nextState = reducer(undefined, { type: actions.LOGIN_REQUEST });
    expect(nextState).to.eql(expectedState);
  });

  it('login request success updates state correctly', () => {
    const emailAddress = 'emailaddress';
    const accessToken = '1';
    const action = {
      type: actions.LOGIN_REQUEST_SUCCESS,
      payload: {
        email: emailAddress,
        access_token: accessToken,
      },
    };
    const expectedState = {
      isSignedIn: true,
      email: emailAddress,
      token: accessToken,
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.eql(expectedState);
  });

  it('login request fail updates state correctly', () => {
    const action = {
      type: actions.LOGIN_REQUEST_FAIL,
    };
    const expectedState = {
      isSignedIn: false,
      isError: true,
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.eql(expectedState);
  });

  it('logout updates state correctly', () => {
    const action = {
      type: actions.LOGOUT,
    };
    const expectedState = {
      isSignedIn: false,
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.eql(expectedState);
  });

  it('returns last state with unrecognized type', () => {
    const initialState = {
      isSignedIn: true,
      email: 'good-email',
      token: '1',
    };
    const action = {
      type: null,
      payload: {
        email: 'bad-email',
      },
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(initialState);
  });
});
