export enum SortDirections {
  ascend = 'ascend',
  descend = 'descend',
}

export type ResultsState = {
  columns: string[];
  selectedFacets: Facet[];
  queryString: string;
  queryUrl: string;
  isFetching: boolean;
  results: any[];
  sort: {
    column: string;
    direction: SortDirections;
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
    direction: SortDirections.ascend,
  },
};

export default initialState;
