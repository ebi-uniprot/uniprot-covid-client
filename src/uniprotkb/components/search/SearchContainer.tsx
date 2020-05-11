import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { MainSearch } from 'franklin-sites';

import './styles/search-container.scss';

const namespaces = [
  'UniProtKB - the UniProt knowledgebase',
  'UniRef',
  'UniParc',
  'Proteomes',
  'Publications',
  'Keywords',
];

const Search = () => {
  const history = useHistory();

  // local state to hold the search value without modifying URL
  const [searchTerm, setSearchTerm] = useState(
    // initialise with whatever is already in the URL
    queryString.parse(history.location.search, { decode: true }).query
  );

  const handleSubmit = (event: Event) => {
    // prevent normal browser submission
    event.preventDefault();

    // extract current search (to keep other fields if defined)
    const search = queryString.parse(history.location.search, { decode: true });
    // add/overwrite the current queried term
    search.query = searchTerm || '*';
    // restringify the resulting search
    const stringifiedSearch = queryString.stringify(search, { encode: true });

    // push a new location to the history containing the modified search term
    history.push({
      pathname: '/uniprotkb', // NOTE: shouldn't that depend on the selected namespace?
      search: stringifiedSearch,
    });
  };

  return (
    <MainSearch
      namespaces={namespaces}
      searchTerm={searchTerm}
      onChange={setSearchTerm}
      onSubmit={handleSubmit}
    />
  );
};

export default Search;
