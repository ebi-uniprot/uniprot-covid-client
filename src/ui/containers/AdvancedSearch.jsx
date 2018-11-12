import { connect } from 'react-redux';
import {
  selectField,
  changeInputValue,
  changeEvidence,
  changeRangeValue,
  changeLogicOperator,
  handleFieldSelect,
  submitQuery,
  addClause,
 } from '../actions';
import AdvancedSearchField from '../components/AdvancedSearchField';

const mapStateToProps = state => ({
  clauses: state.clauses,
  searchTerms: state.searchTerms,
  namespace: namespace,
});
​
const mapDispatchToProps = dispatch => ({
  handleFieldSelect: (clauseId, fieldId, value) => dispatch(selectField(clauseId, fieldId, value)),
  handleInputChange: (clauseId, fieldId, value) => dispatch(changeInputValue(clauseId, fieldId, value)),
  handleEvidenceChange: (clauseId, fieldId, value) => dispatch(changeEvidence(clauseId, fieldId, value)),
  handleRangeInputChange: (clauseId, fieldId, value, from) => dispatch(changeRangeValue(clauseId, fieldId, value, from)),
  handleLogicChange: (clauseId, fieldId, value) => dispatch(changeLogicOperator(clauseId, fieldId, value)),
  handleRemoveClause: (clauseId) => dispatch(handleFieldSelect(clauseId)),
  submitQuery: dispatch(submitQuery()),
  addClause: dispatch(addClause()),
})
​
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchField);
