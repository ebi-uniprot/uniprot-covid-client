import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import AdvancedSearchField from '../components/AdvancedSearchField';

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case VisibilityFilters.SHOW_ALL:
//       return todos
//     case VisibilityFilters.SHOW_COMPLETED:
//       return todos.filter(t => t.completed)
//     case VisibilityFilters.SHOW_ACTIVE:
//       return todos.filter(t => !t.completed)
//     default:
//       throw new Error('Unknown filter: ' + filter)
//   }
// }

const mapStateToProps = state => ({
  clauses: state.clauses,
  searchTerms: state.searchTerms,
  namespace: namespace,
})
​
const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
  handleFieldSelect: (clauseId, fieldId) => dispatch(handleFieldSelect(clauseId, fieldId)),
  handleInputChange: (clauseId, fieldId) => dispatch(handleFieldSelect(clauseId, fieldId)),
  handleEvidenceChange: (clauseId, fieldId) => dispatch(handleFieldSelect(clauseId, fieldId)),
  handleRangeInputChange: (clauseId, fieldId) => dispatch(handleFieldSelect(clauseId, fieldId)),
  handleLogicChange: (clauseId, fieldId) => dispatch(handleFieldSelect(clauseId, fieldId)),
  handleRemoveClause: (clauseId, fieldId) => dispatch(handleFieldSelect(clauseId, fieldId)),
  submitQuery: (clauseId, fieldId) => dispatch(handleFieldSelect(clauseId, fieldId)),
  addField: (clauseId, fieldId) => dispatch(handleFieldSelect(clauseId, fieldId)),
})
​
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdvancedSearchField);
