import advancedSearchInitialState from '../search/state/initialState';
import resultsInitialState from '../results/state/initialState';

const initialState = { ...advancedSearchInitialState, ...resultsInitialState };
export default initialState;
