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
  nextUrl: string;
  isFetching: { [url: string]: boolean };
  isFetched: { [url: string]: boolean };
  results: any[];
  sort: SortType;
  totalNumberResults: number;
};

const initialState = {
  columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  selectedFacets: [],
  results: [],
  facets: [],
  queryString: '',
  isFetching: {},
  isFetched: {},
  nextUrl: '',
  sort: {
    column: undefined,
    direction: undefined,
  },
  totalNumberResults: 0,
};

export default initialState;
