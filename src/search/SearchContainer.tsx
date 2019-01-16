import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
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
  fetchSearchTermsIfNeeded,
  fetchEvidencesIfNeeded,
  updateClauses,
} from './state/actions';
import {
  Clause, FieldType, Operator, EvidenceType,
} from './types/searchTypes';
import AdvancedSearch from './AdvancedSearch';
import createQueryString from './utils/QueryStringGenerator';

import './styles/SearchContainer.scss';
import { RootState } from '../state/initialState';
import { SearchState } from './state/initialState';

interface SearchProps extends RouteComponentProps, SearchState {
  queryString: string;
  dispatchFetchSearchTerms: () => void;
  dispatchfetchEvidencesIfNeeded: (type: string) => void;
  dispatchSubmitAdvancedQuery: () => void;
  dispatchUpdateQueryString: (type: string) => void;
  dispatchAddClause: () => void;
}

interface SearchContainerState {
  showAdvanced: boolean;
}

export class Search extends Component<SearchProps, SearchContainerState> {
  constructor(props: SearchProps) {
    super(props);
    const { queryString } = props;
    this.state = {
      showAdvanced: false,
      queryString,
    };
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleAdvancedSubmitClick = this.handleAdvancedSubmitClick.bind(this);
    this.handleQueryStringChange = this.handleQueryStringChange.bind(this);
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
    history.push({ pathname: '/uniprotkb', search: `query=${encodedQueryString}` });
  }

  handleQueryStringChange(queryString) {
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
          onChange={this.handleQueryStringChange}
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

const mapStateToProps = (state: RootState) => ({
  clauses: state.query.clauses,
  searchTerms: state.query.searchTerms.data,
  namespace: state.query.namespace,
  evidences: state.query.evidences,
  queryString: state.results.queryString,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleFieldSelect: (clauseId: string, field: FieldType) => dispatch(selectField(clauseId, field)),
  handleInputChange: (clauseId: string, value: string) => dispatch(updateInputValue(clauseId, value)),
  handleEvidenceChange: (clauseId: string, value: string) => dispatch(updateEvidence(clauseId, value)),
  handleRangeInputChange: (clauseId: string, value: number, from: boolean) => dispatch(updateRangeValue(clauseId, value, from)),
  handleLogicChange: (clauseId: string, value: Operator) => dispatch(updateLogicOperator(clauseId, value)),
  handleRemoveClause: (clauseId: string) => dispatch(removeClause(clauseId)),
  dispatchAddClause: () => dispatch(addClause()),
  dispatchfetchEvidencesIfNeeded: evidencesType => dispatch(fetchEvidencesIfNeeded(evidencesType)),
  dispatchFetchSearchTermsIfNeeded: () => dispatch(fetchSearchTermsIfNeeded()),
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
