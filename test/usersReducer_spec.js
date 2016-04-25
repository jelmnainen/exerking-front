import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import reducer from '../src/reducers/usersReducer';

import { USERS_REQUEST, USERS_SUCCESS, USERS_FAIL } from
  '../src/actions/usersActions';
import { LOGOUT } from '../src/actions/authActions';

describe('usersReducer', () => {
  const initialState = fromJS({
    isFetching: false,
    isError: false,
    entries: new Map(),
  });

  it('returns correct initial state', () => {
    const state = fromJS(reducer(undefined, {}));

    expect(state).to.equal(initialState);
  });

  it('changes fetching status correctly', () => {
    const action = {
      type: USERS_REQUEST,
    };
    const expectedState = initialState.merge({
      isFetching: true,
    });
    const nextState = fromJS(reducer(undefined, action));

    expect(nextState).to.equal(expectedState);
  });

  it('populates entries on success', () => {
    const action = {
      type: USERS_SUCCESS,
      payload: [
        { id: 1 },
      ],
    };
    const expectedState = initialState.merge({
      entries: new Map(action.payload.map(item => [item.id, fromJS(item)])),
    });
    const nextState = fromJS(reducer(undefined, action));

    expect(nextState).to.equal(expectedState);
  });

  it('changes error status on fail', () => {
    const action = {
      type: USERS_FAIL,
    };
    const expectedState = initialState.merge({
      isError: true,
    });
    const nextState = fromJS(reducer(undefined, action));

    expect(nextState).to.equal(expectedState);
  });

  it('clears login info on logout', () => {
    const action = {
      type: LOGOUT,
    };

    const localState = initialState.merge({
      entries: new Map({ map: 'map' }),
    });

    const nextState = reducer(localState, action);

    expect(nextState).to.equal(initialState);
  });
});
