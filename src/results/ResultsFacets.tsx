import React, { FC } from 'react';
import { Facets } from 'franklin-sites';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Facet } from '../types/responseTypes';
import { getLocationForParams, getParamsFromURL } from './utils';
import { SelectedFacet } from './types/resultsTypes';

const ResultsFacets: FC<{ facets: Facet[] } & RouteComponentProps> = ({
  facets,
  location,
  history,
}) => {
  const { search: queryParamFromUrl } = location;
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const addFacet = (facetName: string, facetValue: string): void => {
    const facet: SelectedFacet = { name: facetName, value: facetValue };

    history.push(
      getLocationForParams(
        query,
        [...selectedFacets.concat(facet)],
        sortColumn,
        sortDirection
      )
    );
  };

  const removeFacet = (facetName: string, facetValue: string): void => {
    const index = selectedFacets.findIndex(
      (selectedFacet) =>
        selectedFacet.name === facetName && selectedFacet.value === facetValue
    );

    selectedFacets.splice(index, 1);
    history.push(
      getLocationForParams(query, selectedFacets, sortColumn, sortDirection)
    );
  };

  return (
    <Facets
      data={facets}
      selectedFacets={selectedFacets}
      addFacet={(name: string, value: string) => addFacet(name, value)}
      removeFacet={(name: string, value: string) => removeFacet(name, value)}
    />
  );
};

export default withRouter(ResultsFacets);
