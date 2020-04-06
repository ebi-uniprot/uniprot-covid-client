import { ActionType } from 'typesafe-actions';
import * as resultsActions from './resultsActions';
import resultsInitialState, {
  ResultsState,
  ViewMode,
} from './resultsInitialState';

export type ResultAction = ActionType<typeof resultsActions>;
const resultsReducers = (
  state: ResultsState = resultsInitialState,
  action: ResultAction
) => {
  switch (action.type) {
    case resultsActions.REQUEST_BATCH_OF_RESULTS:
      return {
        ...state,
        results: { ...state.results, isFetching: true },
      };
    case resultsActions.RECEIVE_BATCH_OF_RESULTS:
      return {
        ...state,
        facets: action.payload.data.facets,
        lastUpdated: action.payload.receivedAt,
        totalNumberResults: parseInt(action.payload.totalNumberResults, 10),
        releaseDate: action.payload.releaseDate,
        results: {
          data: [...state.results.data, ...action.payload.data.results],
          isFetching: false,
          isFetched: {
            ...state.results.isFetched,
            [action.payload.url]: true,
          },
        },
        nextUrl: action.payload.nextUrl || '',
      };
    case resultsActions.CLEAR_RESULTS: {
      return {
        ...state,
        results: {
          data: [],
          isFetching: false,
          isFetched: {},
        },
        isFetching: false,
        isFetched: {},
      };
    }
    case resultsActions.SWITCH_VIEW_MODE: {
      return {
        ...state,
        viewMode:
          state.viewMode === ViewMode.CARD ? ViewMode.TABLE : ViewMode.CARD,
      };
    }
    case resultsActions.REQUEST_FIELDS:
      return {
        ...state,
        fields: { ...state.fields, isFetching: true },
      };
    case resultsActions.RECEIVE_FIELDS:
      return {
        ...state,
        fields: { data: action.payload.data, isFetching: false },
      };
    case resultsActions.UPDATE_TABLE_COLUMNS: {
      return {
        ...state,
        tableColumns: action.payload.tableColumns,
      };
    }
    default:
      return state;
  }
};

export default resultsReducers;
