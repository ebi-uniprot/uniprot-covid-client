import {
  SelectedFacet,
  SortDirections,
  SortType,
  SortableColumns,
} from '../types/resultsTypes';

export type ResultsState = {
  columns: string[];
  facets: any[];
  selectedFacets: SelectedFacet[];
  queryString: string;
  queryUrl: string;
  isFetching: { [url: string]: boolean };
  isFetched: { [url: string]: boolean };
  results: any[];
  sort: SortType;
  urls: [{ url: string; start: number; stop: number }];
  totalNumberResults: number;
};

const initialState = {
  columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  selectedFacets: [],
  results: [],
  facets: [],
  queryString: '',
  queryUrl: '',
  isFetching: {},
  isFetched: {},
  sort: {
    column: undefined,
    direction: undefined,
  },
  urls: [],
  totalNumberResults: 0,
};

export default initialState;
