import React, { FC } from 'react';
import { Facets } from 'franklin-sites';
import { Facet } from '../types/responseTypes';

const ResultsFacets: FC<{ facets: Facet[] }> = ({ facets }) => {
  // const facetsAsString = (facets: SelectedFacet[]): string => {
  //   if (!facets || facets.length <= 0) {
  //     return '';
  //   }
  //   return facets.reduce(
  //     (accumulator, facet, i) =>
  //       `${accumulator}${i > 0 ? ',' : ''}${facet.name}:${facet.value}`,
  //     '&facets='
  //   );
  // };

  // const addFacet = (facetName: string, facetValue: string): void => {
  //   const {
  //     location: { search: queryParamFromUrl },
  //   } = this.props;
  //   const {
  //     query,
  //     selectedFacets,
  //     sortColumn,
  //     sortDirection,
  //   } = getURLParams(queryParamFromUrl);

  //   const facet: SelectedFacet = { name: facetName, value: facetValue };

  //   setURLParams(
  //     query,
  //     [...selectedFacets.concat(facet)],
  //     sortColumn,
  //     sortDirection
  //   );
  // };

  // const removeFacet = (facetName: string, facetValue: string): void => {
  //   const {
  //     location: { search: queryParamFromUrl },
  //   } = this.props;
  //   const {
  //     query,
  //     selectedFacets,
  //     sortColumn,
  //     sortDirection,
  //   } = getURLParams(queryParamFromUrl);

  //   const index = selectedFacets.findIndex(
  //     selectedFacet =>
  //       selectedFacet.name === facetName && selectedFacet.value === facetValue
  //   );

  //   selectedFacets.splice(index, 1);
  //   setURLParams(query, selectedFacets, sortColumn, sortDirection);
  // };
  return (
    <Facets
      data={facets}
      selectedFacets={[]}
      addFacet={() => null}
      removeFacet={() => null}
    />
  );
};

export default ResultsFacets;
