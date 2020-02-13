import searchInitialState from '../search/state/searchInitialState';
import resultsInitialState from '../results/state/resultsInitialState';
import entryInitialState from '../entry/state/entryInitialState';
import blastInitialState from '../blast/state/blastInitialState';

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  entry: entryInitialState,
  blast: blastInitialState,
};
export default initialState;
