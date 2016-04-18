import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import reducer from '../src/reducers/exercisesReducer';
import { EXERCISES_SUCCESS, EXERCISES_UPDATE_SUCCESS, EXERCISES_UPDATE_FAILURE,
  EXERCISES_ADD_RESET, EXERCISES_UPDATE_RESET, EXERCISES_FAILURE,
  EXERCISES_SINGLE_FAILURE, EXERCISES_DELETE_FAILURE,
  EXERCISES_ADD_SUCCESS, EXERCISES_REQUEST, EXERCISES_SINGLE_REQUEST,
  EXERCISES_DELETE_REQUEST, EXERCISES_DELETE_SUCCESS, EXERCISES_SINGLE_SUCCESS,
  EXERCISES_UPDATE_REQUEST, EXERCISES_ADD_REQUEST }
  from '../src/actions/exercisesActions';
import { LOGOUT } from '../src/actions/authActions';

describe('exercisesReducer', () => {
  it('returns last state with unrecognized type', () => {
    const initialState = '1';
    const nextState = reducer(initialState, {});
    expect(nextState).to.equal(initialState);
  });

  it('returns correct payload when fetching all exercises', () => {
    const action = {
      type: EXERCISES_SUCCESS,
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

  it('updates exercise correctly', () => {
    const action = {
      type: EXERCISES_UPDATE_SUCCESS,
      payload: { id: 1, title: 'new' },
    };
    const initialState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1, title: 'old' })],
      ]),
    });
    const expectedState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1, title: 'new' })],
      ]),
      updateForm: {
        inProgress: false,
        isError: false,
        isCreated: true,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('adds exercise correctly', () => {
    const action = {
      type: EXERCISES_ADD_SUCCESS,
      payload: { id: 2, title: 'new' },
    };
    const initialState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1, title: 'old' })],
      ]),
    });
    const expectedState = fromJS({
      entries: initialState.get('entries')
        .set(action.payload.id, fromJS(action.payload)),
      addRequest: {
        inProgress: false,
        isError: false,
        isCreated: true,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('creates correct error message when updating fails', () => {
    const action = {
      type: EXERCISES_UPDATE_FAILURE,
      payload: {
        errors: {
          title: ['blank'],
        },
      },
    };
    const initialState = fromJS({
      entries: new Map(),
    });
    const expectedState = initialState.merge({
      updateForm: {
        inProgress: false,
        isError: true,
        errorMessages: action.payload,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('resets exercises correctly after update reset', () => {
    const action = {
      type: EXERCISES_UPDATE_RESET,
    };
    const initialState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1, title: 'new' })],
      ]),
      updateForm: {
        inProgress: false,
      },
    });
    const expectedState = initialState.merge({
      updateForm: {},
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('resets exercises correctly after add reset', () => {
    const action = {
      type: EXERCISES_ADD_RESET,
    };
    const initialState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1, title: 'new' })],
      ]),
      updateForm: {
        inProgress: false,
      },
    });
    const expectedState = initialState.merge({
      updateForm: {
        inProgress: false,
      },
      addRequest: {},
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('handles failures correctly', () => {
    [
      EXERCISES_FAILURE,
      EXERCISES_SINGLE_FAILURE,
      EXERCISES_DELETE_FAILURE,
    ].forEach(type => {
      const initialState = fromJS({
        entries: new Map([
          [1, fromJS({ id: 1, title: 'new' })],
        ]),
      });
      const expectedState = initialState.merge({
        isFetching: false,
        isError: true,
      });
      const action = { type };
      const nextState = reducer(initialState, action);
      expect(nextState).to.eql(expectedState);
    });
  });

  it('handles logout correctly', () => {
    const action = {
      type: LOGOUT,
    };
    const initialState = fromJS({
      entries: 1,
    });
    const expectedState = fromJS({
      isFetching: false,
      isError: false,
      entries: {},
      addRequest: {},
      updateForm: {},
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('handles requests correctly', () => {
    [
      EXERCISES_REQUEST,
      EXERCISES_SINGLE_REQUEST,
      EXERCISES_DELETE_REQUEST,
    ].forEach(type => {
      const initialState = fromJS({});
      const expectedState = initialState.merge({
        isFetching: true,
        isError: false,
      });
      const action = { type };
      const nextState = reducer(initialState, action);
      expect(nextState).to.eql(expectedState);
    });
  });

  it('handles add requests correctly', () => {
    const action = {
      type: EXERCISES_ADD_REQUEST,
    };
    const initialState = fromJS({});
    const expectedState = initialState.merge({
      addRequest: {
        inProgress: true,
        isError: false,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('handles update requests correctly', () => {
    const action = {
      type: EXERCISES_UPDATE_REQUEST,
    };
    const initialState = fromJS({});
    const expectedState = initialState.merge({
      updateForm: {
        inProgress: true,
        isError: false,
      },
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('deletes exercise successfully', () => {
    const action = {
      type: EXERCISES_DELETE_SUCCESS,
      payload: { id: 1 },
    };
    const initialState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1, title: 'delete' })],
        [2, fromJS({ id: 2, title: 'keep' })],
      ]),
    });
    const expectedState = fromJS({
      entries: new Map([
        [2, fromJS({ id: 2, title: 'keep' })],
      ]),
      isFetching: false,
      isError: false,
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });

  it('fetch single exercise successfully', () => {
    const action = {
      type: EXERCISES_SINGLE_SUCCESS,
      payload: { id: 1, title: 'fetch' },
    };
    const initialState = fromJS({
      entries: new Map([
        [1, fromJS({ id: 1, title: 'fetch' })],
      ]),
    });
    const expectedState = initialState.merge({
      isFetching: false,
      isError: false,
    });
    const nextState = reducer(initialState, action);
    expect(nextState).to.eql(expectedState);
  });
});
