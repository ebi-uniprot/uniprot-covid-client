import { combineReducers, Action } from 'redux';
import query from '../search/state/reducers';
import results from '../results/state/reducers';
import { RootState } from './initialState';

const combinedReducer = combineReducers({
  query,
  results,
});

const rootReducer = (state: RootState, action: Action) => {
  const finalState = combinedReducer(state, action);
  return finalState;
};

export default rootReducer;
