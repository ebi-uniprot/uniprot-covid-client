import { SearchState } from '../../uniprotkb/state/searchInitialState';
import { ResultsState } from '../../uniprotkb/state/resultsInitialState';
import { EntryState } from '../../uniprotkb/state/entryInitialState';
import { MessagesState } from '../../messages/state/messagesInitialState';
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
