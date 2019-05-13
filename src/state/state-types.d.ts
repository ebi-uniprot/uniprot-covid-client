import { StateType } from 'typesafe-actions';
import rootReducer from './rootReducer';
import { SearchAction } from '../search/state/searchReducers';
import { ResultAction } from '../results/state/resultsReducers';
import { SearchState } from '../search/state/searchInitialState';
import { ResultsState } from '../results/state/resultsInitialState';

export type RootState = {
  query: SearchState;
  results: ResultsState;
};

export type RootAction = SearchAction | ResultAction;
