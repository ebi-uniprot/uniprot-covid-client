import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchResults } from './state/actions';
import { fetchSearchTerms } from '../search/state/actions';
import ResultsTable from './ResultsTable';
import { unpackQueryUrl, getQueryFromUrl } from '../utils/apiUrls';

export class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatchFetchSearchTerms } = this.props;
    this.fetchResults();
    dispatchFetchSearchTerms();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: queryParam },
      searchTerms,
    } = this.props;
    console.log(searchTerms);
    console.log(queryParam);
    if (searchTerms && searchTerms.length > 0) {
      const query = getQueryFromUrl(queryParam);
      if (query) {
        const t = unpackQueryUrl(query, searchTerms);
        console.log(t);
      }
    }
    // const { queryString: prevQueryString } = prevProps;
    // if (prevQueryString !== queryInUrl) {
    //   this.fetchResults();
    // }
  }

  fetchResults() {
    const {
      location: { search: queryParam },
      columns,
      dispatchFetchResults,
    } = this.props;
    console.log(queryParam);
    const query = getQueryFromUrl(queryParam);
    console.log(query);
    dispatchFetchResults(encodeURI(query), columns);
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
  queryString: state.query.queryString,
  columns: state.results.columns,
  results: state.results.results,
  isFetching: state.results.isFetching,
  searchTerms: state.query.searchTerms.data,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: (query, columns) => dispatch(fetchResults(query, columns)),
  dispatchFetchSearchTerms: () => dispatch(fetchSearchTerms()),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
