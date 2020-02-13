import { combineReducers } from 'redux';
import searchReducers, { SearchAction } from '../search/state/searchReducers';
import resultsReducers, {
  ResultAction,
} from '../results/state/resultsReducers';
import { SearchState } from '../search/state/searchInitialState';
import { ResultsState } from '../results/state/resultsInitialState';
import initialState from './initialState';
import { EntryState } from '../entry/state/entryInitialState';
import entryReducers, { EntryAction } from '../entry/state/entryReducers';
import { BlastState } from '../blast/state/blastInitialState';
import blastReducers, { BlastAction } from '../blast/state/blastReducers';

type RootState = {
  query: SearchState;
  results: ResultsState;
  entry: EntryState;
  blast: BlastState;
};

const appReducer = combineReducers({
  query: searchReducers,
  results: resultsReducers,
  entry: entryReducers,
  blast: blastReducers,
});

const rootReducer = (
  state: RootState | undefined,
  action: SearchAction | ResultAction | EntryAction | BlastAction
) => {
  if (action.type === 'RESET') {
    return initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
