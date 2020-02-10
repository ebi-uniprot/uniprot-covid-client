import searchInitialState from '../search/state/searchInitialState';
import resultsInitialState from '../results/state/resultsInitialState';
import entryInitialState from '../entry/state/entryInitialState';

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  entry: entryInitialState,
};
export default initialState;
