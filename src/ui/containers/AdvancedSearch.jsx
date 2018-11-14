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
} from '../actions';
import ClauseList from '../components/ClauseList';


class AdvancedSearch extends Component {
  componentDidMount() {
    const { dispatchFetchSearchTerms } = this.props;
    console.log('mounted');
    dispatchFetchSearchTerms();
  }


  render() {
    const { namespace, addClause, submitQuery } = this.props;
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
          <button type="button" id="add-field" className="button" onClick={addClause}>
            Add Field
          </button>
          <button
            type="button"
            id="submit-query"
            className="button"
            onClick={submitQuery}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
};

// clauses={clauses}
// searchTerms={searchTerms}
// handleFieldSelect={handleFieldSelect}
// handleInputChange={handleInputChange}
// handleEvidenceChange={handleEvidenceChange}
// handleRangeInputChange={handleRangeInputChange}
// handleLogicChange={handleLogicChange}
// handleRemoveClause={handleRemoveClause}



const mapStateToProps = state => ({
  clauses: state.query.clauses,
  searchTerms: state.query.searchTerms.data,
  namespace: state.query.namespace,
});

const mapDispatchToProps = dispatch => ({
  handleFieldSelect: (clauseId, field) => dispatch(selectField(clauseId, field)),
  handleInputChange: (clauseId, value) => dispatch(updateInputValue(clauseId, value)),
  handleEvidenceChange: (clauseId, fieldId, value) => dispatch(updateEvidence(clauseId, fieldId, value)),
  handleRangeInputChange: (clauseId, value, from) => dispatch(updateRangeValue(clauseId, value, from)),
  handleLogicChange: (clauseId, value) => dispatch(updateLogicOperator(clauseId, value)),
  handleRemoveClause: clauseId => dispatch(removeClause(clauseId)),
  submitQuery: () => dispatch(submitQuery()),
  addClause: () => dispatch(addClause()),
  dispatchFetchSearchTerms: () => dispatch(fetchSearchTerms()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearch);
