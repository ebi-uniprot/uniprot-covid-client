import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types.d';
import * as searchActions from './state/searchActions';
import {
  Clause,
  SearchTermType,
  Operator,
  Evidence,
  Evidences,
  Namespace,
} from './types/searchTypes';
import AdvancedSearch from './AdvancedSearch';
import { createQueryString } from './utils/QueryStringGenerator';

import './styles/SearchContainer.scss';

type Props = {
  queryString: string;
  dispatchUpdateQueryString: (type: string) => void;
  searchTerms: SearchTermType[];
  namespace: Namespace;
  clauses: Clause[];
  evidences: Evidences;
  dispatchUpdateClauses: (clauses: Clause[]) => void;
  dispatchfetchEvidencesIfNeeded: (type: Evidence) => void;
  dispatchFetchSearchTermsIfNeeded: () => void;
  dispatchAddClause: () => void;
  handleFieldSelect: (clauseId: string, field: SearchTermType) => void;
  handleInputChange: (clauseId: string, value: string, id?: string) => void;
  handleEvidenceChange: (clauseId: string, value: string) => void;
  handleRangeInputChange: (
    clauseId: string,
    value: string,
    from?: boolean
  ) => void;
  handleLogicChange: (clauseId: string, value: Operator) => void;
  handleRemoveClause: (clauseId: string) => void;
} & RouteComponentProps;

type State = {
  queryString: string;
};

export class Search extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    const { queryString } = props;
    this.state = { queryString };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleQueryStringChange = this.handleQueryStringChange.bind(this);
  }

  public componentDidUpdate(prevProps: Props) {
    const { queryString: prevQueryString } = prevProps;
    const { queryString } = this.props;
    if (prevQueryString !== queryString) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ queryString });
    }
  }

  private handleSubmitClick() {
    const { history, clauses, dispatchUpdateQueryString } = this.props;
    const queryString = createQueryString(clauses);
    dispatchUpdateQueryString(queryString);
    history.push({ pathname: '/uniprotkb', search: `query=${queryString}` });
  }

  private handleQueryStringChange(queryString: string) {
    this.setState({ queryString });
  }

  public render() {
    const { queryString } = this.state;
    const search = (
      <AdvancedSearch
        {...this.props}
        queryString={queryString}
        handleAdvancedSubmitClick={this.handleSubmitClick}
      />
    );
    return <Fragment>{search}</Fragment>;
  }
}

const mapStateToProps = (state: RootState) => ({
  clauses: state.query.clauses,
  searchTerms: state.query.searchTerms.data,
  namespace: state.query.namespace,
  evidences: state.query.evidences,
  queryString: state.query.queryString,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      handleFieldSelect: (clauseId: string, field: SearchTermType) =>
        searchActions.selectSearchTerm(clauseId, field),
      handleInputChange: (clauseId: string, value: string, id?: string) =>
        searchActions.updateInputValue(clauseId, value, id),
      handleEvidenceChange: (clauseId: string, value: string) =>
        searchActions.updateEvidence(clauseId, value),
      handleRangeInputChange: (
        clauseId: string,
        value: string,
        from?: boolean
      ) => searchActions.updateRangeValue(clauseId, value, from),
      handleLogicChange: (clauseId: string, value: Operator) =>
        searchActions.updateLogicOperator(clauseId, value),
      handleRemoveClause: (clauseId: string) =>
        searchActions.removeClause(clauseId),
      dispatchAddClause: () => searchActions.addClause(),
      dispatchfetchEvidencesIfNeeded: evidencesType =>
        searchActions.fetchEvidencesIfNeeded(evidencesType),
      dispatchFetchSearchTermsIfNeeded: () =>
        searchActions.fetchSearchTermsIfNeeded(),
      dispatchSubmitAdvancedQuery: () => searchActions.submitAdvancedQuery(),
      dispatchUpdateClauses: clauses => searchActions.updateClauses(clauses),
      dispatchUpdateQueryString: queryString =>
        searchActions.updateQueryString(queryString),
    },
    dispatch
  );

const AdvancedSearchContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);

export default AdvancedSearchContainer;
