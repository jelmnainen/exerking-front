import { expect } from 'chai';
import { fromJS } from 'immutable';

import reducer from '../src/reducers/submissionReducer';
import * as actions from '../src/actions/submissionsActions';
import { FILTER_ALL }
  from '../src/constants/submissionsConstants';

describe('submissionReducer', () => {
  const emptyState = fromJS({});
  const initialState = fromJS({
    isFetching: false,
    isError: false,
    entries: {},
    addRequest: {},
    updateRequest: {},
    filter: FILTER_ALL,
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
});
