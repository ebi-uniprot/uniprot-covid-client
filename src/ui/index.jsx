import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { v1 } from 'uuid';
import query from './reducers';
import App from './App';
import '../../node_modules/franklin-sites/dist/index.css';
import '../styles/index.css';

import searchTerms from './searchTerms'

const createField = () => ({
  id: v1(),
  logic: 'AND',
  field: {
    label: 'Any',
    term: 'All',
    example: 'a4_human, P05067, cdc7 human',
    itemType: 'single',
    dataType: 'string',
    id: 'id_Any',
  },
  queryInput: {},
});

const initialState = {
  query: {
    clauses: [...Array(4)].map(() => createField()),
    namespace: 'UniProtKB',
    searchTerms,
  },
};

console.log(initialState);

const DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(query, initialState, DEVTOOLS);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
