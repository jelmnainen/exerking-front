import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const createPersistentStore = compose(
  persistState('auth')
)(createStoreWithMiddleware);

const store = createPersistentStore(reducer);

if (module.hot) {
  module.hot.accept('./reducers/index', () => {
    const nextReducer = require('./reducers/index').default;
    store.replaceReducer(nextReducer);
  });
}

export default store;
