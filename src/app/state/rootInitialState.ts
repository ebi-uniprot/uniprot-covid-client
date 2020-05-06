import searchInitialState, {
  SearchState,
} from '../../uniprotkb/state/searchInitialState';
import resultsInitialState, {
  ResultsState,
} from '../../uniprotkb/state/resultsInitialState';
import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import { SearchAction } from '../../uniprotkb/state/searchReducers';
import { ResultAction } from '../../uniprotkb/state/resultsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';

export type RootState = {
  query: SearchState;
  results: ResultsState;
  messages: MessagesState;
};

export type RootAction = SearchAction | ResultAction | MessagesAction;

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  messages: messagesInitialState,
};
export default initialState;
