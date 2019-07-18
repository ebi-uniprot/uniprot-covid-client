import { combineReducers } from 'redux';
import searchReducers, { SearchAction } from '../search/state/searchReducers';
import resultsReducers, {
  ResultAction,
} from '../results/state/resultsReducers';
import { SearchState } from '../search/state/searchInitialState';
import { ResultsState } from '../results/state/resultsInitialState';
import initialState from './initialState';

type RootState = {
  query: SearchState;
  results: ResultsState;
};

const appReducer = combineReducers({
  query: searchReducers,
  results: resultsReducers,
});

const rootReducer = (
  state: RootState | undefined,
  action: SearchAction | ResultAction
) => {
  if (action.type === 'RESET') {
    return initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
