import { combineReducers, Action, Reducer, ReducersMapObject } from 'redux';
import query, { SearchAction } from '../search/state/reducers';
import results, { ResultAction } from '../results/state/reducers';
import { SearchState } from '../search/state/initialState';
import { ResultsState } from '../results/state/initialState';

type RootState = {
  query: SearchState;
  results: ResultsState;
};

const appReducer = combineReducers({
  query,
  results,
});

const rootReducer = (
  state: RootState | undefined,
  action: SearchAction | ResultAction
) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
