import React, { Component } from 'react';
import ClauseList from './ClauseList';
import { unpackQueryUrl } from '../utils/apiUrls';
import { Namespace } from './types/searchTypes';
import './styles/AdvancedSearch.scss';

type AdvancedSearchProps = {
  handleAdvancedSubmitClick: () => void;
  namespace: Namespace;
  dispatchAddClause: () => void;
};
class AdvancedSearch extends Component<AdvancedSearchProps> {
  componentDidMount() {
    const {
      searchTerms,
      dispatchUpdateClauses,
      dispatchfetchEvidencesIfNeeded,
      dispatchFetchSearchTermsIfNeeded,
      queryString,
    } = this.props;
    dispatchfetchEvidencesIfNeeded('go');
    dispatchfetchEvidencesIfNeeded('annotation');
    dispatchFetchSearchTermsIfNeeded();

    if (searchTerms.length && queryString) {
      dispatchUpdateClauses(unpackQueryUrl(queryString, searchTerms));
    }
  }

  componentDidUpdate(prevProps) {
    const { queryString: prevQueryString, searchTerms: prevSearchTerms } = prevProps;
    const { queryString, searchTerms, dispatchUpdateClauses } = this.props;
    if (
      searchTerms.length
      && queryString
      && (queryString !== prevQueryString || searchTerms !== prevSearchTerms)
    ) {
      dispatchUpdateClauses(unpackQueryUrl(queryString, searchTerms));
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
