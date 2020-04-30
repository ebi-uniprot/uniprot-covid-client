import { SearchAction } from '../search/state/searchReducers';
import { ResultAction } from '../results/state/resultsReducers';
import { MessagesAction } from '../messages/state/messagesReducers';
import { SearchState } from '../search/state/searchInitialState';
import { ResultsState } from '../results/state/resultsInitialState';
import { MessagesState } from '../messages/state/messagesInitialState';

export type RootState = {
  query: SearchState;
  results: ResultsState;
  messages: MessagesState;
};

export type RootAction = SearchAction | ResultAction | MessagesAction;
