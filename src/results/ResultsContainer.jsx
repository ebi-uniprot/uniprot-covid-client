import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSearchResultsIfNeeded, updateQueryString } from './state/actions';
import ResultsTable from './ResultsTable';
import { unpackQueryUrl, getQueryFromUrl } from '../utils/apiUrls';

export class Results extends Component {
  componentDidMount() {
    console.log('in componentDidMount');
    const {
      location: { search: queryParamFromUrl },
      dispatchFetchSearchResultsIfNeeded,
      columns,
    } = this.props;
    const queryFromUrl = getQueryFromUrl(queryParamFromUrl);
    dispatchFetchSearchResultsIfNeeded(encodeURI(queryFromUrl), columns);
  }

  componentDidUpdate(prevProps) {
    console.log('in componentDidUpdate');
    const {
      location: { search: queryParamFromUrl },
      dispatchFetchSearchResultsIfNeeded,
      columns,
    } = this.props;
    const {
      location: { search: prevQueryParamFromUrl },
    } = prevProps;
    const queryFromUrl = getQueryFromUrl(queryParamFromUrl);
    const prevQueryFromUrl = getQueryFromUrl(prevQueryParamFromUrl);
    // console.log(queryFromUrl, prevQueryFromUrl);
    if (queryFromUrl && queryFromUrl !== prevQueryFromUrl) {
      dispatchFetchSearchResultsIfNeeded(encodeURI(queryFromUrl), columns);
    }
  }

  render() {
    const {
      location: { search: queryParam },
      results,
      isFetching,
    } = this.props;
    const query = getQueryFromUrl(queryParam);
    if (!query) {
      return <h3>Error: cannot find query paramter in URL</h3>;
    }
    if (isFetching) {
      return <h3>Loading...</h3>;
    }
    return (
      <Fragment>
        <ResultsTable results={results} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.results.columns,
  results: state.results.data,
  isFetching: state.results.isFetching,
  searchTerms: state.query.searchTerms.data,
  queryString: state.results.queryString,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchSearchResultsIfNeeded: (query, columns) => dispatch(fetchSearchResultsIfNeeded(query, columns)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
