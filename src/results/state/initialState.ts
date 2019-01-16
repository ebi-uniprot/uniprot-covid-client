const initialState = {
  columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  selectedFacets: {},
  data: [],
  queryString: '',
  isFetching: false,
};

export default initialState;
