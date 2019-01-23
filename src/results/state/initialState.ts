export type ResultsState = {
  columns: Array<string>;
  selectedFacets: Array<{ name: string; value: string }>;
  queryString: string;
  queryUrl: string;
  isFetching: boolean;
  results: Array<any>;
};

const initialState = {
  columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  selectedFacets: [],
  results: [],
  queryString: '',
  queryUrl: '',
  isFetching: false,
};

export default initialState;
