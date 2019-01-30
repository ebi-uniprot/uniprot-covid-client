import { SortDirections } from '../sortTypes';
import { Facet } from '../types/resultsTypes';

export type ResultsState = {
  columns: string[];
  selectedFacets: Facet[];
  queryString: string;
  queryUrl: string;
  isFetching: boolean;
  results: any[];
  sort: {
    column: string;
    direction: string;
  };
};

const initialState = {
  columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  selectedFacets: [],
  results: [],
  queryString: '',
  queryUrl: '',
  isFetching: false,
  sort: {
    column: '',
    direction: '',
  },
};

export default initialState;
