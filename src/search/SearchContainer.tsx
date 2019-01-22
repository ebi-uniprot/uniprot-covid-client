import React, { Component, Fragment, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MainSearch } from 'franklin-sites';
import { RootState, RootAction } from '../state/state-types';
import * as searchActions from './state/actions';
import {
  Clause, FieldType, Operator, EvidenceType,
} from './types/searchTypes';
import AdvancedSearch from './AdvancedSearch';
import { createQueryString } from './utils/QueryStringGenerator';

import './styles/SearchContainer.scss';

interface SearchProps extends RouteComponentProps {
  queryString: string;
  // dispatchFetchSearchTerms: () => void;
  // dispatchfetchEvidencesIfNeeded: (type: string) => void;
  // dispatchSubmitAdvancedQuery: () => void;
  clauses?: Array<Clause>;
  dispatchUpdateQueryString: (type: string) => void;
  // dispatchAddClause: () => void;
}

interface SearchContainerState {
  showAdvanced: boolean;
  queryString: string;
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

  componentDidUpdate(prevProps: SearchProps) {
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
    const { history, clauses, dispatchUpdateQueryString } = this.props;
    const queryString = createQueryString(clauses);
    dispatchUpdateQueryString(queryString);
    history.push({ pathname: '/uniprotkb', search: `query=${queryString}` });
  }

  handleSubmitClick(e: SyntheticEvent) {
    e.preventDefault();
    const { history, dispatchUpdateQueryString } = this.props;
    const { queryString } = this.state;
    dispatchUpdateQueryString(queryString);
    history.push({ pathname: '/uniprotkb', search: `query=${queryString}` });
  }

  handleQueryStringChange(queryString: string) {
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

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => bindActionCreators(
  {
    handleFieldSelect: (clauseId: string, field: FieldType) => searchActions.selectField(clauseId, field),
    handleInputChange: (clauseId: string, value: string) => searchActions.updateInputValue(clauseId, value),
    handleEvidenceChange: (clauseId: string, value: string) => searchActions.updateEvidence(clauseId, value),
    handleRangeInputChange: (clauseId: string, value: number, from: boolean) => searchActions.updateRangeValue(clauseId, value, from),
    handleLogicChange: (clauseId: string, value: Operator) => searchActions.updateLogicOperator(clauseId, value),
    handleRemoveClause: (clauseId: string) => searchActions.removeClause(clauseId),
    dispatchAddClause: () => searchActions.addClause(),
    dispatchfetchEvidencesIfNeeded: evidencesType => searchActions.fetchEvidencesIfNeeded(evidencesType),
    dispatchFetchSearchTermsIfNeeded: () => searchActions.fetchSearchTermsIfNeeded(),
    dispatchSubmitAdvancedQuery: () => searchActions.submitAdvancedQuery(),
    dispatchUpdateClauses: clauses => searchActions.updateClauses(clauses),
    dispatchUpdateQueryString: queryString => searchActions.updateQueryString(queryString),
  },
  dispatch,
);

const SearchContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Search),
);

export default SearchContainer;
