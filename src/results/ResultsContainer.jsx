import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Facets } from 'franklin-sites';
import { fetchResults, addFacetToQuery } from './state/actions';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsTable from './ResultsTable';

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedRows: {} };
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    const {
      location: { search: queryFromUrl },
      queryString,
      history,
    } = this.props;
    if (queryFromUrl) {
      console.log('queryString = unpack(queryFromUrl)');
      console.log('dispatch setQueryString');
      return;
    }
    console.log('getting');
    this.fetchResults();
  }

  componentDidUpdate(prevProps) {
    const { queryString: prevQueryString } = prevProps;
    const { queryString } = this.props;
    if (prevQueryString !== queryString) {
      this.fetchResults();
    }
  }

  fetchResults() {
    const {
      queryString, columns, dispatchFetchResults, history,
    } = this.props;
    history.replace({ to: '/uniprotkb', search: `query=${encodeURI(queryString)}` });
    dispatchFetchResults(queryString, columns);
  }

  handleRowSelect(rowId) {
    const { selectedRows: prevSelectedRows } = this.state;
    if (rowId in prevSelectedRows) {
      const { [rowId]: value, ...selectedRows } = prevSelectedRows;
      this.setState({ selectedRows });
    } else {
      prevSelectedRows[rowId] = true;
      this.setState({ selectedRows: prevSelectedRows });
    }
  }

  render() {
    const {
      results,
      facets,
      isFetching,
      selectedFacets,
      dispatchAddFacetToQuery,
      columns,
    } = this.props;
    const { selectedRows } = this.state;
    if (isFetching) {
      return <h3>Loading...</h3>;
    }
    return (
      <SideBarLayout
        sidebar={(
          <Facets
            data={facets}
            selectedFacets={selectedFacets}
            toggleFacet={dispatchAddFacetToQuery}
          />
)}
        content={(
          <ResultsTable
            results={results}
            columnNames={columns}
            handleRowSelect={this.handleRowSelect}
            selectedRows={selectedRows}
          />
)}
      />
    );
  }
}

const mapStateToProps = state => ({
  queryString: state.query.queryString,
  columns: state.results.columns,
  selectedFacets: state.results.selectedFacets,
  results: state.results.results,
  facets: state.results.facets,
  isFetching: state.results.isFetching,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: (query, columns) => dispatch(fetchResults(query, columns)),
  dispatchAddFacetToQuery: (facetName, facetValue) => dispatch(addFacetToQuery(facetName, facetValue)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
