import { StateType } from 'typesafe-actions';
import rootReducer from './reducers';
import { SearchActions } from '../search/state/reducers';
// import { ResultsActions } from '../results/state/reducers';

export type RootState = StateType<typeof rootReducer>;
export type RootAction = SearchActions;
// export type RootAction = SearchActions | ResultsActions;
