/* eslint no-underscore-dangle: ["error", { "allow": ["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] }] */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './state/reducers';
import App from './App';
import '../node_modules/franklin-sites/dist/index.css';
import './styles/index.css';
import initialState from './state/initialState';

const debug = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(rootReducer, initialState, debug(applyMiddleware(thunkMiddleware)));
ReactDOM.render(<App store={store} />, document.getElementById('root'));
