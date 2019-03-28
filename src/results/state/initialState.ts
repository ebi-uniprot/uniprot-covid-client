export type ResultsState = {
  columns: string[];
  facets: any[];
  nextUrl: string;
  isFetching: boolean;
  isFetched: { [url: string]: boolean };
  results: any[];
  totalNumberResults: number;
};

const initialState = {
  columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  results: [],
  facets: [],
  isFetching: false,
  isFetched: {},
  nextUrl: '',
  totalNumberResults: 0,
};

export default initialState;
