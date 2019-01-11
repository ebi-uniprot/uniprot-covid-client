import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from './state/actions';
import { fetchSearchTerms, setClauses, updateQueryString } from '../search/state/actions';
import ResultsTable from './ResultsTable';
import { unpackQueryUrl, getQueryFromUrl } from '../utils/apiUrls';

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { queryString: undefined };
  }

  componentDidMount() {
    const {
      location: { search: queryParamFromUrl },
      dispatchFetchSearchTerms,
      dispatchUpdateQueryString,
      queryString,
    } = this.props;
    dispatchFetchSearchTerms();
    console.log('here');
    const queryFromUrl = getQueryFromUrl(queryParamFromUrl);
    if (queryFromUrl && queryString !== queryFromUrl) {
      dispatchUpdateQueryString(queryFromUrl);
    }
  }

  componentDidUpdate(prevProps) {
    console.log('in componentDidUpdate');
    const {
      location: { search: queryParamFromUrl },
      searchTerms,
      queryString,
      dispatchSetClauses,
      dispatchFetchResults,
      dispatchUpdateQueryString,
      columns,
    } = this.props;
    const queryFromUrl = getQueryFromUrl(queryParamFromUrl);
    if (queryFromUrl && queryString !== queryFromUrl) {
      console.log(queryString);
      dispatchFetchResults(encodeURI(queryFromUrl), columns);
      if (searchTerms && searchTerms.length > 0) {
        const clauses = unpackQueryUrl(queryFromUrl, searchTerms);
        dispatchSetClauses(clauses);
      }
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
  results: state.results.results,
  isFetching: state.results.isFetching,
  searchTerms: state.query.searchTerms.data,
  queryString: state.query.queryString,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: (query, columns) => dispatch(fetchResults(query, columns)),
  dispatchFetchSearchTerms: () => dispatch(fetchSearchTerms()),
  dispatchSetClauses: clauses => dispatch(setClauses(clauses)),
  dispatchUpdateQueryString: queryString => dispatch(updateQueryString(queryString)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
