import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { MainSearch } from 'franklin-sites';
import {
  selectField,
  updateInputValue,
  updateEvidence,
  updateRangeValue,
  updateLogicOperator,
  addClause,
  removeClause,
  fetchSearchTerms,
  fetchEvidencesIfNeeded,
} from './state/actions';
import { copyQueryClausesToSearch } from '../state/actions';
import ClauseList from './ClauseList';

export class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvanced: false,
    };
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchSearchTerms, dispatchfetchEvidencesIfNeeded } = this.props;
    dispatchFetchSearchTerms();
    dispatchfetchEvidencesIfNeeded('go');
    dispatchfetchEvidencesIfNeeded('annotation');
  }

  toggleAdvanced() {
    const { showAdvanced } = this.state;
    this.setState({ showAdvanced: !showAdvanced });
  }

  handleSubmitClick() {
    const { dispatchCopyQueryClausesToSearch, history } = this.props;
    dispatchCopyQueryClausesToSearch();
    history.push('/uniprotkb');
  }

  render() {
    const { namespace, dispatchAddClause } = this.props;
    const { showAdvanced } = this.state;
    let search;
    if (showAdvanced) {
      search = (
        <Fragment>
          <ClauseList {...this.props} />
          <button type="button" id="add-field" className="button" onClick={dispatchAddClause}>
            Add Field
          </button>
        </Fragment>
      );
    } else {
      search = <MainSearch />;
    }

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
        {search}
        <button type="button" onClick={this.toggleAdvanced}>
          Advanced search
        </button>
        <div>
          <button
            type="button"
            id="submit-query"
            className="button"
            onClick={this.handleSubmitClick}
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
  dispatchAddClause: () => dispatch(addClause()),
  dispatchfetchEvidencesIfNeeded: evidencesType => dispatch(fetchEvidencesIfNeeded(evidencesType)),
  dispatchFetchSearchTerms: () => dispatch(fetchSearchTerms()),
  dispatchCopyQueryClausesToSearch: () => dispatch(copyQueryClausesToSearch()),
});

const AdvancedSearchContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AdvancedSearch),
);

export default AdvancedSearchContainer;
