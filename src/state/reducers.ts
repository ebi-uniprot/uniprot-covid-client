import { combineReducers, Action } from 'redux';
import query from '../search/state/reducers';
import results from '../results/state/reducers';

const rootReducer = combineReducers({
  query,
  results,
});

export default rootReducer;
