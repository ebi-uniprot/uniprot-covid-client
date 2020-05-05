import searchInitialState from '../search/state/searchInitialState';
import resultsInitialState from '../results/state/resultsInitialState';
import messagesInitialState from '../messages/state/messagesInitialState';

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  messages: messagesInitialState,
};
export default initialState;
