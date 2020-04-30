import { SearchAction } from '../search/state/searchReducers';
import { ResultAction } from '../results/state/resultsReducers';
import { MessagesAction } from '../messages/state/messagesReducers';
import { SearchState } from '../search/state/searchInitialState';
import { ResultsState } from '../results/state/resultsInitialState';
import { EntryState } from '../entry/state/entryInitialState';
import { MessagesState } from '../messages/state/messagesInitialState';

export type RootState = {
  query: SearchState;
  results: ResultsState;
  entry: EntryState;
  messages: MessagesState;
};

export type RootAction = SearchAction | ResultAction | MessagesAction;
