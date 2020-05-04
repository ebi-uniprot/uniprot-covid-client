import searchInitialState from '../search/state/searchInitialState';
import resultsInitialState from '../results/state/resultsInitialState';
import entryInitialState from '../entry/state/entryInitialState';
import messagesInitialState from '../messages/state/messagesInitialState';

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  entry: entryInitialState,
  messages: messagesInitialState,
};
export default initialState;
