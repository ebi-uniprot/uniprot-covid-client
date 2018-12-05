import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchResults } from './state/actions';
import ResultsTable from './ResultsTable';
import { serializableDeepAreEqual } from '../utils/utils';
import createQueryString from './utils/QueryStringGenerator';

export class Results extends Component {
  componentDidMount() {
    const {
      location: { search: queryFromUrl },
      queryClauses,
      history,
    } = this.props;
    if (queryFromUrl) {
      console.log('queryClauses = unpack(queryFromUrl)');
      console.log('dispatch setQueryClauses');
      return;
    }
    this.replaceUrlAndFetchResults();
  }

  componentDidUpdate(prevProps) {
    const { queryClauses: prevQueryClauses } = prevProps;
    const { queryClauses } = this.props;
    if (!serializableDeepAreEqual(prevQueryClauses, queryClauses)) {
      this.replaceUrlAndFetchResults();
    }
  }

  replaceUrlAndFetchResults() {
    const { queryClauses, dispatchFetchResults, history } = this.props;
    const encodedQueryString = encodeURI(createQueryString(queryClauses));
    history.replace({ to: '/uniprotkb', search: `query=${encodedQueryString}` });
    dispatchFetchResults(encodedQueryString);
  }

  render() {
    const { queryClauses, results } = this.props;
    return (
      <Fragment>
        <Link to="/">←Advanced Search</Link>
        <ResultsTable queryClauses={queryClauses} results={results} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  queryClauses: state.search.queryClauses,
  results: state.search.results,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: query => dispatch(fetchResults(query)),
});

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Results),
);

export default ResultsContainer;
