import React from 'react';
import ClauseList from './ClauseList';

const AdvancedSearchForm = ({
  clauses,
  searchTerms,
  namespace,
  handleFieldSelect,
  handleInputChange,
  handleEvidenceChange,
  handleRangeInputChange,
  handleLogicChange,
  handleRemoveClause,
  submitQuery,
  addClause,
}) => {
  console.log(clauses);
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
        clauses={clauses}
        searchTerms={searchTerms}
        handleFieldSelect={handleFieldSelect}
        handleInputChange={handleInputChange}
        handleEvidenceChange={handleEvidenceChange}
        handleRangeInputChange={handleRangeInputChange}
        handleLogicChange={handleLogicChange}
        handleRemoveClause={handleRemoveClause}
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
};

export default AdvancedSearchForm;
