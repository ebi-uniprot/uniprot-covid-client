import React from 'react';
import ClauseList from './ClauseList';
import { Namespace } from './types/searchTypes';

import './styles/AdvancedSearch.scss';

type AdvancedSearchProps = {
  handleAdvancedSubmitClick: () => void;
  namespace: Namespace;
  dispatchAddClause: () => void;
};

const AdvancedSearch = (props: AdvancedSearchProps) => {
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
};

export default AdvancedSearch;
