import searchInitialState from '../search/state/initialState';
import resultsInitialState from '../results/state/initialState';

const initialState = { ...searchInitialState, ...resultsInitialState };
export default initialState;
