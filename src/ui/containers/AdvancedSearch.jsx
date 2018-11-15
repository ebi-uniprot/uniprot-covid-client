import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectField,
  updateInputValue,
  updateEvidence,
  updateRangeValue,
  updateLogicOperator,
  submitQuery,
  addClause,
  removeClause,
  fetchSearchTerms,
  fetchEvidencesIfNeeded,
} from '../actions';
import ClauseList from '../components/ClauseList';


class AdvancedSearch extends Component {
  componentDidMount() {
    const {
      dispatchFetchSearchTerms,
      dispatchfetchEvidencesIfNeeded,
    } = this.props;
    dispatchFetchSearchTerms();
    dispatchfetchEvidencesIfNeeded('go');
    dispatchfetchEvidencesIfNeeded('annotation');
  }

  render() {
    const { namespace, dispatchAddClause, dispatchSubmitQuery } = this.props;
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
        <ClauseList
          {...this.props}
        />
        <hr />
        <div>
          <button type="button" id="add-field" className="button" onClick={dispatchAddClause}>
            Add Field
          </button>
          <button
            type="button"
            id="submit-query"
            className="button"
            onClick={dispatchSubmitQuery}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  clauses: state.query.clauses,
  searchTerms: state.query.searchTerms.data,
  namespace: state.query.namespace,
  evidences: state.query.evidences,
});

const mapDispatchToProps = dispatch => ({
  handleFieldSelect: (clauseId, field) => dispatch(selectField(clauseId, field)),
  handleInputChange: (clauseId, value) => dispatch(updateInputValue(clauseId, value)),
  handleEvidenceChange: (clauseId, value) => dispatch(updateEvidence(clauseId, value)),
  handleRangeInputChange: (clauseId, value, from) => dispatch(updateRangeValue(clauseId, value, from)),
  handleLogicChange: (clauseId, value) => dispatch(updateLogicOperator(clauseId, value)),
  handleRemoveClause: clauseId => dispatch(removeClause(clauseId)),
  dispatchSubmitQuery: () => dispatch(submitQuery()),
  dispatchAddClause: () => dispatch(addClause()),
  dispatchfetchEvidencesIfNeeded: evidencesType => dispatch(fetchEvidencesIfNeeded(evidencesType)),
  dispatchFetchSearchTerms: () => dispatch(fetchSearchTerms()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearch);
