import { expect } from 'chai';

import reducer from '../src/reducers/exercisesReducer';
import { EXERCISES_REQUEST_SUCCESS } from '../src/actions/exercisesActions';

describe('exercisesReducer', () => {
  it('returns last state with unrecognized type', () => {
    const initialState = '1';
    const nextState = reducer(initialState, {});
    expect(nextState).to.equal(initialState);
  });

  it('returns correct payload', () => {
    const initialState = {};
    const payload = [{ id: 1 }];
    const expectedState = {
      isFetching: false,
      isError: false,
      entries: {
        [payload[0].id]: payload[0],
      },
    };

    const nextState = reducer(initialState, { type: EXERCISES_REQUEST_SUCCESS, payload });
    expect(nextState).to.eql(expectedState);
  });
});
