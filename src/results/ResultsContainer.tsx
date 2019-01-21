import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { default as queryStringModule } from 'query-string';
import { Facets } from 'franklin-sites';
import { fetchResults, addFacet, removeFacet } from './state/actions';
import { updateQueryString } from '../search/state/actions';
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
      location: { search: queryParamFromUrl },
      queryString,
      selectedFacets,
      dispatchFetchResults,
      dispatchUpdateQueryString,
      columns,
      history,
    } = this.props;
    const queryFromUrl = queryStringModule.parse(queryParamFromUrl).query;
    if (queryFromUrl && queryFromUrl !== queryString) {
      dispatchUpdateQueryString(queryFromUrl);
    } else {
      dispatchFetchResults(queryString, columns, selectedFacets);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: queryParamFromUrl },
      dispatchFetchResults,
      queryString,
      selectedFacets,
      columns,
      history,
    } = this.props;
    const {
      location: { search: prevQueryParamFromUrl },
    } = prevProps;

    // const queryFromUrl = queryStringModule.parse(queryParamFromUrl).query;
    // const prevQueryFromUrl = queryStringModule.parse(prevQueryParamFromUrl).query;
    // if (queryFromUrl && queryFromUrl !== prevQueryFromUrl) {
    if (
      queryString !== prevProps.queryString
      || selectedFacets !== prevProps.selectedFacets
      || columns !== prevProps.columns
    ) {
      history.push({ pathname: '/uniprotkb', search: `query=${queryString}` });
      dispatchFetchResults(queryString, columns, selectedFacets);
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

  render() {
    const {
      results,
      facets,
      isFetching,
      selectedFacets,
      columns,
      dispatchAddFacet,
      dispatchRemoveFacet,
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
            addFacet={dispatchAddFacet}
            removeFacet={dispatchRemoveFacet}
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
  dispatchFetchResults: (query, columns, selectedFacets) => dispatch(fetchResults(query, columns, selectedFacets)),
  dispatchAddFacet: (facetName, facetValue) => dispatch(addFacet(facetName, facetValue)),
  dispatchRemoveFacet: (facetName, facetValue) => dispatch(removeFacet(facetName, facetValue)),
  dispatchUpdateQueryString: queryString => dispatch(updateQueryString(queryString)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
