import searchInitialState, {
  SearchState,
} from '../../uniprotkb/state/searchInitialState';
import resultsInitialState, {
  ResultsState,
} from '../../uniprotkb/state/resultsInitialState';
import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import blastInitialState, {
  BlastState,
} from '../../blast/state/blastInitialState';
import { SearchAction } from '../../uniprotkb/state/searchReducers';
import { ResultAction } from '../../uniprotkb/state/resultsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { BlastAction } from '../../blast/state/blastReducers';

export type RootState = {
  query: SearchState;
  results: ResultsState;
  messages: MessagesState;
  blast: BlastState;
};

export type RootAction =
  | SearchAction
  | ResultAction
  | MessagesAction
  | BlastAction;

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  messages: messagesInitialState,
  blast: blastInitialState,
};
export default initialState;
