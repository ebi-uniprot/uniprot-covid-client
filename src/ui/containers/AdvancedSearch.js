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
} from '../actions';
import AdvancedSearchForm from '../components/AdvancedSearchForm';

const mapStateToProps = state => ({
  clauses: state.query.clauses,
  searchTerms: state.query.searchTerms,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvancedSearchForm);
