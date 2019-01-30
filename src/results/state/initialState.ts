import { SortDirections } from '../sortTypes';

export type ResultsState = {
  columns: Array<string>;
  selectedFacets: Array<{ name: string; value: string }>;
  queryString: string;
  queryUrl: string;
  isFetching: boolean;
  results: Array<any>;
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
    direction: SortDirections.ascend.app,
  },
};

export default initialState;
