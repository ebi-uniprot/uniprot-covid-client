import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Facets } from 'franklin-sites';
import { fetchResults, toggleFacet } from './state/actions';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsTable from './ResultsTable';

export class Results extends Component {
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
    const encodedQueryString = encodeURI(queryString);
    history.replace({ to: '/uniprotkb', search: `query=${encodedQueryString}` });
    dispatchFetchResults(encodedQueryString, columns);
  }

  render() {
    const {
      results, facets, isFetching, selectedFacets, dispatchToggleFacet,
    } = this.props;
    if (isFetching) {
      return <h3>Loading...</h3>;
    }
    return (
      <SideBarLayout
        sidebar={
          <Facets data={facets} selectedFacets={selectedFacets} toggleFacet={dispatchToggleFacet} />
        }
        content={<ResultsTable results={results} />}
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
  dispatchToggleFacet: (facetName, facetValue) => dispatch(toggleFacet(facetName, facetValue)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
