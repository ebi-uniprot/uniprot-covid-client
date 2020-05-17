import { combineReducers } from 'redux';
import initialState, { RootState, RootAction } from './rootInitialState';
import searchReducers from '../../uniprotkb/state/searchReducers';
import resultsReducers from '../../uniprotkb/state/resultsReducers';
import messagesReducers from '../../messages/state/messagesReducers';

const appReducer = combineReducers({
  query: searchReducers,
  results: resultsReducers,
  messages: messagesReducers,
});

const rootReducer = (state: RootState | undefined, action: RootAction) => {
  if (action.type === 'RESET') {
    return initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
