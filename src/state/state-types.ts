import { SearchAction } from '../search/state/searchReducers';
import { ResultAction } from '../results/state/resultsReducers';
import { SearchState } from '../search/state/searchInitialState';
import { ResultsState } from '../results/state/resultsInitialState';
import { EntryState } from '../entry/state/entryInitialState';
import { BlastState } from '../blast/state/blastInitialState';
import { EntryAction } from '../entry/state/entryReducers';
import { BlastAction } from '../blast/state/blastReducers';

export type RootState = {
  query: SearchState;
  results: ResultsState;
  entry: EntryState;
  blast: BlastState;
};

export type RootAction =
  | SearchAction
  | ResultAction
  | EntryAction
  | BlastAction;
