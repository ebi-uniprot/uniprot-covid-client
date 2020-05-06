import searchInitialState, {
  SearchState,
} from '../../uniprotkb/state/searchInitialState';
import resultsInitialState, {
  ResultsState,
} from '../../uniprotkb/state/resultsInitialState';
import entryInitialState, {
  EntryState,
} from '../../uniprotkb/state/entryInitialState';
import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import { SearchAction } from '../../uniprotkb/state/searchReducers';
import { ResultAction } from '../../uniprotkb/state/resultsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';

export type RootState = {
  query: SearchState;
  results: ResultsState;
  entry: EntryState;
  messages: MessagesState;
};

export type RootAction = SearchAction | ResultAction | MessagesAction;

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  entry: entryInitialState,
  messages: messagesInitialState,
};
export default initialState;
