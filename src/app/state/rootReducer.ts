import { combineReducers } from 'redux';
import searchReducers, {
  SearchAction,
} from '../../uniprotkb/state/searchReducers';
import resultsReducers, {
  ResultAction,
} from '../../uniprotkb/state/resultsReducers';
import { SearchState } from '../../uniprotkb/state/searchInitialState';
import { ResultsState } from '../../uniprotkb/state/resultsInitialState';
import initialState from './initialState';
import { EntryState } from '../../uniprotkb/state/entryInitialState';
import entryReducers from '../../uniprotkb/state/entryReducers';
import { MessagesState } from '../../messages/state/messagesInitialState';
import messagesReducers, {
  MessagesAction,
} from '../../messages/state/messagesReducers';

type RootState = {
  query: SearchState;
  results: ResultsState;
  entry: EntryState;
  messages: MessagesState;
};

const appReducer = combineReducers({
  query: searchReducers,
  results: resultsReducers,
  entry: entryReducers,
  messages: messagesReducers,
});

const rootReducer = (
  state: RootState | undefined,
  action: SearchAction | ResultAction | MessagesAction
) => {
  if (action.type === 'RESET') {
    return initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
