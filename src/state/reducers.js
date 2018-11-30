import { combineReducers } from 'redux';
import query from '../advanced-search/state/reducers';
import search from '../results/state/reducers';

export default combineReducers({
  query,
  search,
});
