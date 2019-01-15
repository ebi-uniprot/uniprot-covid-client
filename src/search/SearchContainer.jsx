import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MainSearch } from 'franklin-sites';
import {
  selectField,
  updateInputValue,
  updateEvidence,
  updateRangeValue,
  updateLogicOperator,
  submitAdvancedQuery,
  addClause,
  removeClause,
  fetchSearchTerms,
  fetchEvidencesIfNeeded,
  updateClauses,
} from './state/actions';
import AdvancedSearch from './AdvancedSearch';
import createQueryString from './utils/QueryStringGenerator';

import './styles/SearchContainer.scss';

export class Search extends Component {
  constructor(props) {
    super(props);
    const { queryString } = props;
    this.state = {
      showAdvanced: false,
      queryString,
    };
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleAdvancedSubmitClick = this.handleAdvancedSubmitClick.bind(this);
    this.hundleQueryStringChange = this.hundleQueryStringChange.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchSearchTerms } = this.props;
    dispatchFetchSearchTerms();
  }

  componentDidUpdate(prevProps) {
    const { queryString: prevQueryString } = prevProps;
    const { queryString } = this.props;
    if (prevQueryString !== queryString) {
      this.setState({ queryString });
    }
  }

  toggleAdvanced() {
    const { showAdvanced } = this.state;
    this.setState({ showAdvanced: !showAdvanced });
  }

  handleAdvancedSubmitClick() {
    const { history, clauses } = this.props;
    const encodedQueryString = encodeURI(createQueryString(clauses));
    history.push({ pathname: '/uniprotkb', search: `query=${encodedQueryString}` });
  }

  handleSubmitClick(e) {
    e.preventDefault();
    const { history } = this.props;
    const { queryString } = this.state;
    const encodedQueryString = encodeURI(queryString);
    console.log('encodedQueryString', encodedQueryString);
    history.push({ pathname: '/uniprotkb', search: `query=${encodedQueryString}` });
  }

  hundleQueryStringChange(queryString) {
    this.setState({ queryString });
  }

  render() {
    const { showAdvanced, queryString } = this.state;
    let search;
    if (showAdvanced) {
      search = (
        <AdvancedSearch
          {...this.props}
          queryString={queryString}
          handleAdvancedSubmitClick={this.handleAdvancedSubmitClick}
        />
      );
    } else {
      search = (
        <MainSearch
          onSubmit={this.handleSubmitClick}
          onChange={this.hundleQueryStringChange}
          searchTerm={queryString}
        />
      );
    }
    return (
      <Fragment>
        {search}
        <button type="button" onClick={this.toggleAdvanced} className="adv-search-toggle">
          {showAdvanced ? 'Back to quick search' : 'Advanced search'}
        </button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  clauses: state.query.clauses,
  searchTerms: state.query.searchTerms.data,
  namespace: state.query.namespace,
  evidences: state.query.evidences,
  queryString: state.results.queryString,
});

const mapDispatchToProps = dispatch => ({
  handleFieldSelect: (clauseId, field) => dispatch(selectField(clauseId, field)),
  handleInputChange: (clauseId, value) => dispatch(updateInputValue(clauseId, value)),
  handleEvidenceChange: (clauseId, value) => dispatch(updateEvidence(clauseId, value)),
  handleRangeInputChange: (clauseId, value, from) => dispatch(updateRangeValue(clauseId, value, from)),
  handleLogicChange: (clauseId, value) => dispatch(updateLogicOperator(clauseId, value)),
  handleRemoveClause: clauseId => dispatch(removeClause(clauseId)),
  dispatchAddClause: () => dispatch(addClause()),
  dispatchfetchEvidencesIfNeeded: evidencesType => dispatch(fetchEvidencesIfNeeded(evidencesType)),
  dispatchFetchSearchTerms: () => dispatch(fetchSearchTerms()),
  dispatchSubmitAdvancedQuery: () => dispatch(submitAdvancedQuery()),
  dispatchUpdateClauses: clauses => dispatch(updateClauses(clauses)),
});

const SearchContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Search),
);

export default SearchContainer;
