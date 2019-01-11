import searchInitialState from '../search/state/initialState';
import { SearchState } from '../search/state/initialState';
import resultsInitialState from '../results/state/initialState';

export type RootState = {
  query: SearchState;
  results: any; // TODO implement this
};

const initialState: RootState = {
  query: searchInitialState,
  results: resultsInitialState,
};
export default initialState;
