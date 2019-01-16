import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Facets } from 'franklin-sites';
import { fetchResultsIfNeeded, toggleFacet } from './state/actions';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsTable from './ResultsTable';
import { getQueryFromUrl } from '../utils/apiUrls';
import { createFacetsQueryString } from '../search/utils/QueryStringGenerator';

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedRows: {} };
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.addFacetToQuery = this.addFacetToQuery.bind(this);
  }

  componentDidMount() {
    const {
      location: { search: queryParamFromUrl },
      dispatchFetchResultsIfNeeded,
      columns,
    } = this.props;
    const queryFromUrl = getQueryFromUrl(queryParamFromUrl);
    dispatchFetchResultsIfNeeded(queryFromUrl, columns);
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: queryParamFromUrl },
      dispatchFetchResultsIfNeeded,
      columns,
    } = this.props;
    const {
      location: { search: prevQueryParamFromUrl },
    } = prevProps;
    const queryFromUrl = getQueryFromUrl(queryParamFromUrl);
    const prevQueryFromUrl = getQueryFromUrl(prevQueryParamFromUrl);
    if (queryFromUrl && queryFromUrl !== prevQueryFromUrl) {
      dispatchFetchResultsIfNeeded(queryFromUrl, columns);
    }
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

  addFacetToQuery(facetName, facetValue) {
    const {
      selectedFacets, dispatchToggleFacet, queryString, history,
    } = this.props;
    dispatchToggleFacet(facetName, facetValue);
    console.log(createFacetsQueryString(selectedFacets));
    const updatedQueryString = `${queryString}${createFacetsQueryString(selectedFacets)}`;
    history.push({ pathname: '/uniprotkb', search: `query=${updatedQueryString}` });
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
            toggleFacet={this.addFacetToQuery}
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
  queryString: state.results.queryString,
  columns: state.results.columns,
  selectedFacets: state.results.selectedFacets,
  results: state.results.results,
  facets: state.results.facets,
  isFetching: state.results.isFetching,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResultsIfNeeded: (query, columns) => dispatch(fetchResultsIfNeeded(query, columns)),
  dispatchToggleFacet: (facetName, facetValue) => dispatch(toggleFacet(facetName, facetValue)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
