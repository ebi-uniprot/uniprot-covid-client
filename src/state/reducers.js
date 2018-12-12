import { combineReducers } from 'redux';
import query from '../advanced-search/state/reducers';
import results from '../results/state/reducers';

const combinedReducer = combineReducers({
  query,
  results,
});

const rootReducer = (state, action) => {
  const finalState = combinedReducer(state, action);
  return finalState;
};

export default rootReducer;
