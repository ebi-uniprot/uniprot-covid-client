import React from 'react';
import { Facets } from 'franklin-sites';
import { SelectedFacet } from '../../types/resultsTypes';
import { Facet } from '../../types/responseTypes';

const EntryPublicationsFacets: React.FC<{
  facets: Facet[];
  selectedFacets: SelectedFacet[];
  setSelectedFacets: (facets: SelectedFacet[]) => void;
}> = ({ facets, selectedFacets, setSelectedFacets }) => {
  const addFacet = (name: string, value: string) => {
    setSelectedFacets([...selectedFacets, { name, value }]);
  };

  const removeFacet = (name: string, value: string) => {
    setSelectedFacets(
      selectedFacets.filter(
        selectedFacet =>
          !(selectedFacet.name === name && selectedFacet.value === value)
      )
    );
  };
  return (
    <Facets
      data={facets}
      addFacet={addFacet}
      removeFacet={removeFacet}
      selectedFacets={selectedFacets}
    />
  );
};

export default EntryPublicationsFacets;
