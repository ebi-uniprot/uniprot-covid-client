/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './state/reducers';
import App from './App';
import initialState from './state/initialState';

let store;
if (process.env.NODE_ENV === 'development') {
  const debug = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(rootReducer, initialState, debug(applyMiddleware(thunkMiddleware)));
} else {
  store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));
}
ReactDOM.render(<App store={store} />, document.getElementById('root'));
