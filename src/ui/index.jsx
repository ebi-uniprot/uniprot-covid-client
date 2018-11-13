import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import query from './reducers';
import App from './App';
import createEmptyField from './utils';
import searchTerms from './searchTerms';
import '../../node_modules/franklin-sites/dist/index.css';
import '../styles/index.css';

const initialState = {
  query: {
    clauses: [...Array(4)].map(() => createEmptyField()),
    namespace: 'UniProtKB',
    searchTerms,
  },
};

console.log(initialState);

const DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(query, initialState, DEVTOOLS);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
