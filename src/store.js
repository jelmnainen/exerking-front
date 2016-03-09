import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { fromJS, Map } from 'immutable';

import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const createPersistentStore = compose(
  persistState('auth', {
    slicer: (paths) => (state) => state.filter((v, k) => paths.indexOf(k) !== -1),
    serialize: (subset) => JSON.stringify(subset.toJS()),
    deserialize: (serialized) => fromJS(JSON.parse(serialized)),
    merge: (initial, persisted) => new Map(initial).mergeDeep(persisted),
  })
)(createStoreWithMiddleware);

const store = createPersistentStore(reducer);

if (module.hot) {
  module.hot.accept('./reducers/index', () => {
    const nextReducer = require('./reducers/index').default;
    store.replaceReducer(nextReducer);
  });
}

export default store;
