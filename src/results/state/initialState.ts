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
  isFetching: boolean;
  results: any[];
  sort: SortType;
};

const initialState = {
  columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  selectedFacets: [],
  results: [],
  facets: [],
  queryString: '',
  queryUrl: '',
  isFetching: false,
  sort: {
    column: undefined,
    direction: undefined,
  },
};

export default initialState;
