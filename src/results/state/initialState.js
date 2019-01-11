const initialState = {
  results: {
    columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
    data: [],
    encodedQueryString: '',
    isFetching: false,
  },
};

export default initialState;
