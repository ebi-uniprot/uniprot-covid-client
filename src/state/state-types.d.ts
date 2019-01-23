import { StateType } from 'typesafe-actions';
import rootReducer from './reducers';
import { SearchAction } from '../search/state/reducers';
import { ResultAction } from '../results/state/reducers';

export type RootState = StateType<typeof rootReducer>;
export type RootAction = SearchAction | ResultAction;
