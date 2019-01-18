const initialState = {
  columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  selectedFacets: [],
  data: [],
  queryString: '',
  queryUrl: '',
  isFetching: false,
};

export default initialState;
