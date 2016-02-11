import { expect } from 'chai';

import reducer from '../src/reducers/registrationReducer';
import * as actions from '../src/actions/registrationActions.js';

describe('registrationReducer', () => {
  it('returns state correctly with unrecognized type', () => {
    const initialState = {};
    const action = {
      type: actions.null,
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.eql(initialState);
  });

  it('registration request starts correctly', () => {
    const action = {
      type: actions.REGISTRATION_REQUEST,
    };
    const expectedState = {
      inProgress: true,
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.eql(expectedState);
  });

  it('registration request success updates state correctly', () => {
    const action = {
      type: actions.REGISTRATION_REQUEST_SUCCESS,
    };
    const expectedState = {
      inProgress: false,
      isError: false,
      isOK: true,
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.eql(expectedState);
  });

  it('registration request fail updates state correctly', () => {
    const action = {
      type: actions.REGISTRATION_REQUEST_FAIL,
      errors: {
        email: 'false',
      },
    };
    const expectedState = {
      inProgress: false,
      isError: true,
      errorMessages: action.errors,
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.eql(expectedState);
  });
});
