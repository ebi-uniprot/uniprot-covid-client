/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

function configureStore(initialState?: object) {
  let store;
  if (process.env.NODE_ENV === 'development') {
    const debug = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    store = createStore(
      rootReducer,
      initialState,
      debug
        ? debug(applyMiddleware(thunkMiddleware))
        : applyMiddleware(thunkMiddleware)
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunkMiddleware)
    );
  }
  return store;
}

const store = configureStore();

export default store;