import { expect } from 'chai';
import { Map, fromJS } from 'immutable';

import reducer from '../src/reducers/batchesReducer';

import { BATCHES_REQUEST, BATCHES_SUCCESS, BATCHES_FAILURE,
  BATCHES_DELETE_REQUEST, BATCHES_DELETE_SUCCESS, BATCHES_DELETE_FAILURE,
  BATCHES_ADD_REQUEST, BATCHES_ADD_SUCCESS, BATCHES_ADD_FAILURE,
  BATCHES_ADD_RESET, BATCHES_UPDATE_REQUEST, BATCHES_UPDATE_SUCCESS,
  BATCHES_UPDATE_FAILURE, BATCHES_UPDATE_RESET,
  BATCHES_SINGLE_REQUEST, BATCHES_SINGLE_SUCCESS, BATCHES_SINGLE_FAILURE }
  from '../src/actions/batchesActions';

describe('batchesReducer', () => {
  const initialState = fromJS({
    isFetching: false,
    isError: false,
    entries: {},
    forms: {
      add: {},
      update: {},
    },
  });

  const testEntry = {
    id: 3,
    name: 'test',
  };

  const oneEntryState = initialState.merge({
    entries: {
      1: {
        id: 1,
      },
    },
  });

  const fetchingState = initialState.merge({
    isFetching: true,
    isError: false,
  });

  it('initializes correctly', () => {
    const nextState = reducer(undefined, {});
    expect(nextState.toJS()).to.eql(initialState.toJS());
  });

  it('returns state correctly with unrecognized type', () => {
    const currentState = 42;
    const nextState = reducer(currentState, {});
    expect(nextState).to.equal(currentState);
  });

  describe('batches request', () => {
    it('updates state correctly on start', () => {
      const action = {
        type: BATCHES_REQUEST,
        payload: null,
      };
      const nextState = reducer(initialState, action);
      expect(nextState).to.eql(fetchingState);
    });

    it('updates state correctly on success', () => {
      const action = {
        type: BATCHES_SUCCESS,
        payload: [
          { id: 1 },
        ],
      };

      const expectedState = fetchingState.merge({
        isFetching: false,
        isError: false,
        entries: {
          1: {
            id: 1,
          },
        },
      });
      const nextState = reducer(fetchingState, action);
      expect(nextState.toJS()).to.eql(expectedState.toJS());
    });

    it('updates state correctly on failure', () => {
      const action = {
        type: BATCHES_FAILURE,
        payload: null,
      };
      const expectedState = fetchingState.merge({
        isFetching: false,
        isError: true,
      });

      const nextState = reducer(fetchingState, action);
      expect(nextState).to.eql(expectedState);
    });
  });

  describe('delete request', () => {
    const twoEntryState = initialState.merge({
      entries: {
        1: {
          id: 1,
        },
        2: {
          id: 2,
        },
      },
    });

    it('updates state correctly', () => {
      const action = {
        type: BATCHES_DELETE_REQUEST,
        payload: null,
      };
      const nextState = reducer(twoEntryState, action);
      const expectedState = twoEntryState.merge({
        isFetching: true,
        isError: false,
      });

      expect(nextState).to.eql(expectedState);
    });

    it('success updates state correctly if there are multiple entities', () => {
      const action = {
        type: BATCHES_DELETE_SUCCESS,
        payload: { id: 2 },
      };
      const nextState = reducer(twoEntryState, action);
      expect(nextState).to.eql(oneEntryState);
    });

    it('success updates state correctly if there is one entity', () => {
      const action = {
        type: BATCHES_DELETE_SUCCESS,
        payload: { id: 1 },
      };
      const nextState = reducer(oneEntryState, action);
      expect(nextState).to.eql(initialState);
    });

    it('failure updates state correctly', () => {
      const action = {
        type: BATCHES_DELETE_FAILURE,
      };
      const expectedState = twoEntryState.merge({
        isFetching: false,
        isError: true,
      });
      const nextState = reducer(twoEntryState, action);
      expect(nextState).to.eql(expectedState);
    });
  });

  describe('add request', () => {
    const addFormInProgress = {
      forms: {
        add: {
          inProgress: true,
          isError: false,
        },
      },
    };
    const addFormInProgressState = initialState.mergeDeep(addFormInProgress);
    const addFormInProgressWithEntryState = oneEntryState.mergeDeep(addFormInProgress);

    const errorMessage = {
      message: 'You did a big boo-boo!',
    };

    const erroredForm = {
      inProgress: false,
      isError: true,
      errorMessages: errorMessage,
    };

    it('updates state correctly', () => {
      const addErroredState = oneEntryState.mergeDeep({
        forms: {
          add: {
            errorMessages: {
              lol: 'asd',
            },
          },
        },
      });
      const action = {
        type: BATCHES_ADD_REQUEST,
        action: null,
      };
      const nextState = reducer(addErroredState, action);
      expect(nextState).to.eql(addFormInProgressWithEntryState);
    });

    describe('success updates state with', () => {
      const action = {
        type: BATCHES_ADD_SUCCESS,
        payload: testEntry,
      };

      const completedForm = {
        inProgress: false,
        isError: false,
        isSuccess: true,
      };

      it('no entries correctly', () => {
        const expectedState = addFormInProgressState.mergeDeep({
          forms: {
            add: completedForm,
          },
          entries: {
            3: testEntry,
          },
        });
        const nextState = reducer(addFormInProgressState, action);
        expect(nextState.toJS()).to.eql(expectedState.toJS());
      });

      it('one entry correctly', () => {
        const expectedState = oneEntryState.mergeDeep({
          forms: {
            add: completedForm,
          },
          entries: {
            3: testEntry,
          },
        });
        const nextState = reducer(oneEntryState, action);
        expect(nextState.toJS()).to.eql(expectedState.toJS());
      });
    });

    it('failure updates state correctly', () => {
      const expectedState = addFormInProgressWithEntryState.mergeDeep({
        forms: {
          add: erroredForm,
        },
      });

      const action = {
        type: BATCHES_ADD_FAILURE,
        payload: errorMessage,
      };
      const nextState = reducer(addFormInProgressWithEntryState, action);
      expect(nextState).to.eql(expectedState);
    });

    it('reset updates state correctly', () => {
      const expectedState = addFormInProgressWithEntryState.setIn(
        ['forms', 'add'],
        new Map()
      );

      const action = {
        type: BATCHES_ADD_RESET,
        payload: null,
      };

      const nextState = reducer(addFormInProgressWithEntryState, action);
      expect(nextState).to.eql(expectedState);
    });
  });

  describe('update request', () => {
    const updateInProgressState = initialState.merge({
      forms: {
        add: {},
        update: {
          inProgress: true,
          isError: false,
        },
      },
      entries: {
        3: testEntry,
      },
    });

    it('updates state correctly', () => {
      const action = {
        type: BATCHES_UPDATE_REQUEST,
        payload: null,
      };

      const currentState = initialState.mergeDeep({
        entries: {
          3: testEntry,
        },
      });

      const nextState = reducer(currentState, action);
      expect(nextState).to.eql(updateInProgressState);
    });

    it('success updates state correctly', () => {
      const updatedTestEntry = {
        id: '3',
        name: 'Lulzors!',
      };

      const action = {
        type: BATCHES_UPDATE_SUCCESS,
        payload: updatedTestEntry,
      };

      const expectedState = updateInProgressState.mergeDeep({
        forms: {
          update: {
            inProgress: false,
            isError: false,
            isSuccess: true,
          },
        },
        entries: {
          3: updatedTestEntry,
        },
      });

      const nextState = reducer(updateInProgressState, action);
      expect(nextState).to.eql(expectedState);
    });

    it('failure updates state correctly', () => {
      const errorMessages = 'fail';
      const action = {
        type: BATCHES_UPDATE_FAILURE,
        payload: errorMessages,
      };

      const expectedState = updateInProgressState.merge({
        forms: {
          update: {
            inProgress: false,
            isError: true,
            errorMessages,
          },
          add: {},
        },
      });

      const nextState = reducer(updateInProgressState, action);
      expect(nextState).to.eql(expectedState);
    });

    it('reset updates state correctly', () => {
      const action = {
        type: BATCHES_UPDATE_RESET,
        payload: null,
      };

      const expectedState = updateInProgressState.setIn(
        ['forms', 'update'],
        new Map()
      );

      const nextState = reducer(updateInProgressState, action);
      expect(nextState).to.eql(expectedState);
    });
  });

  describe('single request', () => {
    it('updates state correctly', () => {
      const action = {
        type: BATCHES_SINGLE_REQUEST,
        payload: null,
      };

      const nextState = reducer(initialState, action);
      expect(nextState).to.eql(fetchingState);
    });

    it('success updates state correctly', () => {
      const action = {
        type: BATCHES_SINGLE_SUCCESS,
        payload: testEntry,
      };

      const expectedState = initialState.mergeDeep({
        isFetching: false,
        isError: false,
        entries: {
          3: testEntry,
        },
      });

      const nextState = reducer(initialState, action);
      expect(nextState.toJS()).to.eql(expectedState.toJS());
    });

    it('failure updates state correctly', () => {
      const action = {
        type: BATCHES_SINGLE_FAILURE,
        payload: null,
      };

      const expectedState = fetchingState.merge({
        isFetching: false,
        isError: true,
      });

      const nextState = reducer(fetchingState, action);
      expect(nextState).to.eql(expectedState);
    });
  });
});
