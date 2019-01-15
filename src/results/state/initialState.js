const initialState = {
  results: {
    columns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
    data: [],
    queryString: '',
    isFetching: false,
  },
};

export default initialState;
