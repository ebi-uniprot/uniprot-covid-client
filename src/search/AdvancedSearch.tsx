import React, { Component } from 'react';
import ClauseList from './ClauseList';
import {
  Namespace,
  EvidenceType,
  Clause,
  SearchTermType,
  Operator,
} from './types/searchTypes';
import './styles/AdvancedSearch.scss';

type AdvancedSearchProps = {
  searchTerms: [any];
  queryString: string;
  namespace: Namespace;
  clauses: Clause[];
  evidences: any;
  dispatchfetchEvidencesIfNeeded: (type: EvidenceType) => void;
  dispatchFetchSearchTermsIfNeeded: () => void;
  handleAdvancedSubmitClick: () => void;
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
};
class AdvancedSearch extends Component<AdvancedSearchProps> {
  componentDidMount() {
    const {
      dispatchfetchEvidencesIfNeeded,
      dispatchFetchSearchTermsIfNeeded,
    } = this.props;
    dispatchfetchEvidencesIfNeeded(EvidenceType.GO);
    dispatchfetchEvidencesIfNeeded(EvidenceType.ANNOTATION);
    dispatchFetchSearchTermsIfNeeded();
  }

  render() {
    const {
      handleAdvancedSubmitClick,
      namespace,
      dispatchAddClause,
    } = this.props;
    return (
      <div className="advanced-search">
        <div>
          <label htmlFor="namespace-select">
            Searching in
            <select id="namespace-select">
              <option>{namespace}</option>
            </select>
          </label>
        </div>
        <ClauseList {...this.props} />
        <button type="button" id="add-field" onClick={dispatchAddClause}>
          Add Field
        </button>
        <div>
          <button
            type="button"
            id="submit-query"
            className="button"
            onClick={handleAdvancedSubmitClick}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default AdvancedSearch;
