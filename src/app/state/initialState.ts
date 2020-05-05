import searchInitialState from '../../uniprotkb/state/searchInitialState';
import resultsInitialState from '../../uniprotkb/state/resultsInitialState';
import entryInitialState from '../../uniprotkb/state/entryInitialState';
import messagesInitialState from '../../messages/state/messagesInitialState';

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  entry: entryInitialState,
  messages: messagesInitialState,
};
export default initialState;
