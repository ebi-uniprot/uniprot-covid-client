import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchResults } from './state/actions';
import ResultsTable from './ResultsTable';
import { serializableDeepAreEqual } from '../utils/utils';

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
    if (!serializableDeepAreEqual(prevQueryString, queryString)) {
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
    const { results } = this.props;
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
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: (query, columns) => dispatch(fetchResults(query, columns)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
