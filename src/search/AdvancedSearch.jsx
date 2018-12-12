import React from 'react';
import ClauseList from './ClauseList';

const AdvancedSearch = (props) => {
  const { handleAdvancedSubmitClick, namespace, dispatchAddClause } = props;
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
      <ClauseList {...props} />
      <button type="button" id="add-field" className="button" onClick={dispatchAddClause}>
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
};

export default AdvancedSearch;
