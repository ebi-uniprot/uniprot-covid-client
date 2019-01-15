import React, { Component } from 'react';
import ClauseList from './ClauseList';
import { unpackQueryUrl } from '../utils/apiUrls';

import './styles/AdvancedSearch.scss';

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { queryString: '' };
  }

  componentDidMount() {
    const { dispatchfetchEvidencesIfNeeded, dispatchFetchSearchTermsIfNeeded } = this.props;
    dispatchfetchEvidencesIfNeeded('go');
    dispatchfetchEvidencesIfNeeded('annotation');
    dispatchFetchSearchTermsIfNeeded();
  }

  componentDidUpdate() {
    const { queryString: incomingQueryString, searchTerms, dispatchUpdateClauses } = this.props;
    const { queryString } = this.state;
    if (searchTerms.length && incomingQueryString && incomingQueryString !== queryString) {
      const clauses = unpackQueryUrl(incomingQueryString, searchTerms);
      dispatchUpdateClauses(clauses);
      this.setState({ queryString: incomingQueryString });
    }
  }

  render() {
    const { handleAdvancedSubmitClick, namespace, dispatchAddClause } = this.props;
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
        <ClauseList {...this.props} />
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
  }
}

export default AdvancedSearch;
