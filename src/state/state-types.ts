import { SearchAction } from '../search/state/searchReducers';
import { ResultAction } from '../results/state/resultsReducers';
import { SearchState } from '../search/state/searchInitialState';
import { ResultsState } from '../results/state/resultsInitialState';
import { EntryState } from '../entry/state/entryInitialState';

export type RootState = {
  query: SearchState;
  results: ResultsState;
  entry: EntryState;
};

export type RootAction = SearchAction | ResultAction;
