import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import reducer from '../src/reducers/exercisesReducer';
import { EXERCISES_REQUEST_SUCCESS } from '../src/actions/exercisesActions';

describe('exercisesReducer', () => {
  it('returns last state with unrecognized type', () => {
    const initialState = '1';
    const nextState = reducer(initialState, {});
    expect(nextState).to.equal(initialState);
  });

  it('returns correct payload', () => {
    const action = {
      type: EXERCISES_REQUEST_SUCCESS,
      payload: [{ id: 2 }],
    };
    const initialState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1 })],
      ]),
    });
    const expectedState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1 })],
        [2, fromJS({ id: 2 })],
      ]),
      isFetching: false,
      isError: false,
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });
});
