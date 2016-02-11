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
    const initialState = [];
    const payload = '1';
    const nextState = reducer(initialState, { type: EXERCISES_REQUEST_SUCCESS, payload });
    expect(nextState).to.equal(payload);
  });
});
