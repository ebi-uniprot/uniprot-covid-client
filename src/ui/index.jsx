import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import query from './reducers';
import App from './App';
import { createEmptyClause } from './utils';
import '../../node_modules/franklin-sites/dist/index.css';
import '../styles/index.css';

const initialState = {
  query: {
    clauses: [...Array(4)].map(() => createEmptyClause()),
    namespace: 'UniProtKB',
    searchTerms: {
      data: [],
    },
  },
};

const debug = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(query, initialState, debug(applyMiddleware(thunkMiddleware)));
ReactDOM.render(<App store={store} />, document.getElementById('root'));
