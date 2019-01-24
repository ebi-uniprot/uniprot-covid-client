import {
  combineReducers, Action, Reducer, ReducersMapObject,
} from 'redux';
import query from '../search/state/reducers';
import results from '../results/state/reducers';

export default combineReducers({
  query,
  results,
});
