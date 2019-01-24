import { StateType } from 'typesafe-actions';
import rootReducer from './reducers';
import { SearchAction } from '../search/state/reducers';
import { ResultAction } from '../results/state/reducers';
import { SearchState } from '../search/state/initialState';
import { ResultsState } from '../results/state/initialState';

export type RootState = {
  query: SearchState;
  results: ResultsState;
};

export type RootAction = SearchAction | ResultAction;
