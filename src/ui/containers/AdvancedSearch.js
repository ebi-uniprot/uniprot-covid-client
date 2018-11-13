import { connect } from 'react-redux';
import {
  selectField,
  updateInputValue,
  updateEvidence,
  updateRangeValue,
  updateLogicOperator,
  submitQuery,
  addClause,
} from '../actions';
import AdvancedSearchForm from '../components/AdvancedSearchForm';

const mapStateToProps = state => ({
  clauses: state.query.clauses,
  searchTerms: state.query.searchTerms,
  namespace: state.query.namespace,
});

const mapDispatchToProps = dispatch => ({
  handleFieldSelect: (clauseId, field) => dispatch(selectField(clauseId, field)),
  handleInputChange: (clauseId, fieldId, value) => dispatch(updateInputValue(clauseId, fieldId, value)),
  handleEvidenceChange: (clauseId, fieldId, value) => dispatch(updateEvidence(clauseId, fieldId, value)),
  handleRangeInputChange: (clauseId, fieldId, value, from) => dispatch(updateRangeValue(clauseId, fieldId, value, from)),
  handleLogicChange: (clauseId, fieldId, value) => dispatch(updateLogicOperator(clauseId, fieldId, value)),
  handleRemoveClause: clauseId => dispatch(selectField(clauseId)),
  submitQuery: () => dispatch(submitQuery()),
  addClause: () => dispatch(addClause()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchForm);
